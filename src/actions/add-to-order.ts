'use server'

import { CartItem, CheckoutFormData } from '@/components/ui/interactive-checkout'
import { getPayload } from 'payload'
import configPayload from '@/payload.config'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Define validation schema for form data
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
      'Invalid phone number format',
    ),
})

// Define validation schema for cart items
const cartItemSchema = z.object({
  id: z.number(),
  quantity: z.number().int().positive(),
  selectedSize: z.string().optional(),
  name: z.string(),
  price: z.number().positive(),
})

// Response type
export type OrderResponse = {
  success: boolean
  message?: string
  error?: string
  order?: any
}

export async function addToOrder(
  formData: CheckoutFormData,
  cart: CartItem[],
  totalPrice: number,
): Promise<OrderResponse> {
  try {
    // Validate form data
    const validatedForm = formSchema.safeParse(formData)
    if (!validatedForm.success) {
      return {
        success: false,
        error: 'Invalid form data',
        message: validatedForm.error.errors.map((e) => e.message).join(', '),
      }
    }

    // Validate cart
    if (!cart || cart.length === 0) {
      return {
        success: false,
        error: 'Cart is empty',
      }
    }

    // Validate each cart item
    for (const item of cart) {
      const validatedItem = cartItemSchema.safeParse(item)
      if (!validatedItem.success) {
        return {
          success: false,
          error: 'Invalid cart item',
          message: `Item "${item.name}" has invalid data`,
        }
      }
    }

    // Validate total price
    if (totalPrice <= 0) {
      return {
        success: false,
        error: 'Invalid total price',
      }
    }

    const payload = await getPayload({ config: configPayload })

    // Create order in database
    const order = await payload.create({
      collection: 'Orders',
      data: {
        TotalPrice: totalPrice,
        products: cart.map((item) => ({
          product: {
            wear: item.id,
            quantity: item.quantity,
            size: item.selectedSize,
          },
        })),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber,
      },
    })

    // Revalidate relevant pages after successful order
    revalidatePath('/orders')
    revalidatePath('/account')

    return {
      success: true,
      order,
      message: 'Order created successfully',
    }
  } catch (error) {
    console.error('Error creating order:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
  }
}
