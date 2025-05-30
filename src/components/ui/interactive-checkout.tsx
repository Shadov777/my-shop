'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, ShoppingCart, X, CreditCard, ChevronDown, User, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'
import type { Wear } from '@/payload-types'
import { addToOrder } from '@/actions/add-to-order'

export interface CartItem extends Omit<Wear, 'updatedAt' | 'createdAt'> {
  quantity: number
  selectedSize?: string
}

interface InteractiveCheckoutProps {
  products?: Wear[]
  customProductsContainer?: string
}

export interface CheckoutFormData {
  firstName: string
  lastName: string
  phoneNumber: string
}

function SizeModal({
  product,
  selectedSize,
  onSelect,
  onClose,
}: {
  product: Wear
  selectedSize?: string
  onSelect: (size: string) => void
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300,
            duration: 0.3,
          }}
          className="bg-zinc-800 rounded-lg p-4 shadow-xl max-w-xs w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-zinc-100">Select Size for {product.name}</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 rounded-full hover:bg-zinc-700"
            >
              <X size={16} className="text-zinc-400" />
            </motion.button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes?.map((size) => (
              <motion.button
                key={size.id}
                onClick={() => onSelect(size.size!)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'py-2 px-3 rounded text-center text-sm transition-colors duration-200',
                  selectedSize === size.size
                    ? 'bg-primary text-white'
                    : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600',
                )}
              >
                {size.size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function CheckoutModal({
  cart,
  totalPrice,
  onClose,
  onSubmit,
}: {
  cart: CartItem[]
  totalPrice: number
  onClose: () => void
  onSubmit: (formData: CheckoutFormData) => void
}) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-zinc-900 rounded-lg shadow-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Complete Your Order</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-800"
            >
              <X size={20} className="text-zinc-400" />
            </motion.button>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
              <div className="space-y-3 max-h-[240px] overflow-y-auto custom-scrollbar">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${index}`}
                    className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg mr-2"
                  >
                    <div className="w-12 h-12 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          typeof item.image === 'object' && item.image?.url
                            ? item.image.url
                            : '/placeholder.svg'
                        }
                        alt={
                          typeof item.image === 'object' && item.image?.alt
                            ? item.image.alt
                            : item.name
                        }
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-white text-sm truncate">{item.name}</p>
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span className="truncate">
                          {item.selectedSize && `Size: ${item.selectedSize}`} • {item.color}
                        </span>
                        <span>x{item.quantity}</span>
                      </div>
                      <p className="text-right text-white text-xs font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Your Information</h3>

              <div>
                <Label htmlFor="firstName" className="text-zinc-300">
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={cn(
                      'bg-zinc-800 border-zinc-700 text-white mt-1',
                      errors.firstName && 'border-red-500',
                    )}
                    placeholder="John"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-zinc-300">
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={cn(
                      'bg-zinc-800 border-zinc-700 text-white mt-1',
                      errors.lastName && 'border-red-500',
                    )}
                    placeholder="Doe"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-zinc-300">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={cn(
                      'bg-zinc-800 border-zinc-700 text-white mt-1',
                      errors.phoneNumber && 'border-red-500',
                    )}
                    placeholder="+1 (555) 123-4567"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Send Order'}
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function InteractiveCheckout({ products, customProductsContainer }: InteractiveCheckoutProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [openSizeDropdown, setOpenSizeDropdown] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Set isMounted to true when component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }))
    setOpenSizeDropdown(null)
  }

  const toggleSizeDropdown = (productId: number) => {
    setOpenSizeDropdown(openSizeDropdown === productId ? null : productId)
  }

  const addToCart = (product: Wear) => {
    const selectedSize = selectedSizes[product.id]

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      // If product has sizes but none selected, highlight the size dropdown
      setOpenSizeDropdown(product.id)
      return
    }

    setCart((currentCart) => {
      // Check if the same product with the same size already exists in cart
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        return currentCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      // Add new item to cart
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
          selectedSize,
        },
      ]
    })
  }

  const removeFromCart = (productId: number, selectedSize?: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => !(item.id === productId && item.selectedSize === selectedSize)),
    )
  }

  const updateQuantity = (productId: number, selectedSize: string | undefined, delta: number) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          const newQuantity = item.quantity + delta
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
        }
        return item
      }),
    )
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
  }

  const handleSubmitOrder = async (formData: CheckoutFormData) => {
    try {
      // Show loading state

      // Call the server action
      const response = await addToOrder(formData, cart, totalPrice)

      if (!response.success) {
        // Handle error
        console.error('Order submission failed:', response.error)

        return
      }

      // Success path
      console.log('Order created:', response.order)
      setOrderSuccess(true)
      setIsCheckoutOpen(false)

      // Show success message

      // Clear cart after successful order
      // Using a cleanup function to handle potential component unmounting
      const timer = setTimeout(() => {
        setCart([])
        setOrderSuccess(false)
      }, 3000)

      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Custom scrollbar styles
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(24, 24, 27, 0.6);
      border-radius: 12px;
      margin: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(113, 113, 122, 0.4);
      border-radius: 12px;
      border: 2px solid rgba(24, 24, 27, 0.6);
      transition: all 0.3s ease;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(147, 51, 234, 0.6);
    }
    
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(113, 113, 122, 0.4) rgba(24, 24, 27, 0.6);
    }
  `

  // Find the active product when size dropdown is open
  const activeProduct = openSizeDropdown ? products?.find((p) => p.id === openSizeDropdown) : null

  return (
    <div className="w-full max-w-4xl mx-auto">
      <style jsx>{scrollbarStyles}</style>
      {orderSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg text-center"
        >
          <p className="text-green-400 font-medium">
            Order submitted successfully! Thank you for your purchase.
          </p>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className={`flex-1 space-y-3 ${customProductsContainer || ''}`}>
          {products?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'group',
                'p-4 rounded-xl',
                'bg-zinc-900',
                'border border-zinc-800',
                'hover:border-zinc-700',
                'transition-all duration-200',
                'relative', // Added to ensure proper stacking context
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'relative w-12 h-12 rounded-lg overflow-hidden',
                      'bg-zinc-800',
                      'transition-colors duration-200',
                      'group-hover:bg-zinc-700',
                    )}
                  >
                    <Image
                      src={
                        typeof product.image === 'object' && product.image?.url
                          ? product.image.url
                          : '/placeholder.svg'
                      }
                      alt={
                        typeof product.image === 'object' && product.image?.alt
                          ? product.image.alt
                          : product.name
                      }
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-zinc-100">{product.name}</h3>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-zinc-800 text-zinc-400">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <span>${product.price}</span>
                      <span>•</span>
                      <span>{product.color}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSizeDropdown(product.id)}
                        className={cn(
                          'flex items-center gap-1 px-2 py-1 text-xs rounded border transition-colors duration-200',
                          openSizeDropdown === product.id
                            ? 'border-primary text-primary'
                            : 'border-zinc-700 text-zinc-300',
                          !selectedSizes[product.id] &&
                            openSizeDropdown === product.id &&
                            'animate-pulse',
                        )}
                      >
                        {selectedSizes[product.id] || 'Size'}
                        <ChevronDown size={12} />
                      </motion.button>
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToCart(product)}
                      className="gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            'w-full md:w-80 flex flex-col',
            'p-4 rounded-xl',
            'bg-zinc-900',
            'border border-zinc-800',
            'md:sticky md:top-4',
            'max-h-[32rem]',
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-4 h-4 text-zinc-500" />
            <h2 className="text-sm font-medium text-zinc-100">Cart ({totalItems})</h2>
          </div>

          <motion.div
            className={cn('flex-1 overflow-y-auto', 'min-h-0', '-mx-4 px-4', 'space-y-3')}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: { duration: 0.2 },
                  }}
                  className={cn(
                    'flex items-center gap-3',
                    'p-2 rounded-lg',
                    'bg-zinc-800/50',
                    'mb-3',
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-100 truncate">
                          {item.name}
                        </span>
                        {item.selectedSize && (
                          <span className="text-xs text-zinc-500">Size: {item.selectedSize}</span>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="p-1 rounded-md hover:bg-zinc-700"
                      >
                        <X className="w-3 h-3 text-zinc-400" />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          className="p-1 rounded-md hover:bg-zinc-700"
                        >
                          <Minus className="w-3 h-3" />
                        </motion.button>
                        <motion.span layout className="text-xs text-zinc-400 w-4 text-center">
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          className="p-1 rounded-md hover:bg-zinc-700"
                        >
                          <Plus className="w-3 h-3" />
                        </motion.button>
                      </div>
                      <motion.span layout className="text-xs text-zinc-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div layout className={cn('pt-3 mt-3', 'border-t border-zinc-800', 'bg-zinc-900')}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-100">Total</span>
              <motion.span layout className="text-sm font-semibold text-zinc-100">
                ${totalPrice.toFixed(2)}
              </motion.span>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="sm"
                className="w-full gap-2"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                <CreditCard className="w-4 h-4" />
                Checkout
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Render the size modal only on the client side after component has mounted */}
      {isMounted &&
        activeProduct &&
        openSizeDropdown &&
        createPortal(
          <SizeModal
            product={activeProduct}
            selectedSize={selectedSizes[activeProduct.id]}
            onSelect={(size) => handleSizeSelect(activeProduct.id, size)}
            onClose={() => setOpenSizeDropdown(null)}
          />,
          document.body,
        )}

      {/* Checkout Modal */}
      {isMounted &&
        isCheckoutOpen &&
        createPortal(
          <CheckoutModal
            cart={cart}
            totalPrice={totalPrice}
            onClose={handleCloseCheckout}
            onSubmit={handleSubmitOrder}
          />,
          document.body,
        )}
    </div>
  )
}

export { InteractiveCheckout }
