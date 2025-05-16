import type { CollectionConfig } from "payload";

export const Wears: CollectionConfig = {
    slug: 'wears',
        admin: {
                useAsTitle: 'name',
        },
        fields: [
                {
                        name: 'name',
                        label: 'Name',
                        type: 'text',
                        required: true,
                },
                {
                        name: 'price',
                        label: 'Price',
                        type: 'number',
                        required: true,
                },
                {
                        name: 'category',
                        label: 'Category',
                        type: 'select',
                        options: [
                                { label: 'Outerwear', value: 'Outerwear' },
                                { label: 'Shirts', value: 'Shirts' },
                                { label: 'Pants', value: 'Pants' },
                                { label: 'Accessories', value: 'Accessories' },
                        ],
                        required: true,
                },
                {
                        name: 'image',
                        label: 'Image',
                        type: 'upload',
                        relationTo: 'media',
                        required: true,
                },
                {
                        name: 'color',
                        label: 'Color',
                        type: 'text',
                        required: true,
                },
                {
                        name: 'sizes',
                        label: 'Sizes',
                        type: 'array',
                        required: true,
                        fields: [
                                {
                                        name: 'size',
                                        type: 'text',
                                }
                        ]
                },
        ]
}
