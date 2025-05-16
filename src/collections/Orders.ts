import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'Orders',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'TotalPrice',
      label: 'Price',
      type: 'number',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'products',
      label: 'Products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'group',
          fields: [
            { name: 'wear', type: 'relationship', relationTo: 'wears', required: true },
            { name: 'quantity', type: 'number', required: true },
            { name: 'size', type: 'text' },
          ],
        },
      ],
    },
  ],
}
