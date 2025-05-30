'use client'

import { useRef, useState } from 'react'
import { motion, Reorder } from 'framer-motion'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export function FeaturedSection() {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Buty',
      description: 'Premium oversized hoodies with unique graphics and embroidery details.',
      price: 89,
      image: '/jordan.png',
    },
    {
      id: '2',
      name: 'T-Shirty',
      description: 'Limited edition graphic t-shirts featuring original artwork and designs.',
      price: 39,
      image: '/koszulka.png',
    },
    {
      id: '3',
      name: 'Spodnie',
      description: 'Tactical streetwear bottoms with multiple pockets and adjustable details.',
      price: 79,
      image: '/denim.png',
    },
    {
      id: '4',
      name: 'Bluzy',
      description: 'Complete your look with our premium caps, beanies, and bags.',
      price: 29,
      image: '/bluza.png',
    },
    {
      id: '5',
      name: 'Elektronika',
      description: 'Complete your look with our premium caps, beanies, and bags.',
      price: 29,
      image: '/pods.png',
    },
    {
      id: '6',
      name: 'Kurtki',
      description: 'Limited edition sneakers and footwear to complete your streetwear look.',
      price: 119,
      image: '/kurtka.png',
    },
    {
      id: '7',
      name: 'Okulary',
      description: 'Premium outerwear designed for style and functionality.',
      price: 149,
      image: '/okulary.png',
    },
    {
      id: '8',
      name: 'Torebki',
      description: 'g ',
      price: 149,
      image: '/torebka.png',
    },
    {
      id: '9',
      name: 'Paski',
      description: 'g ',
      price: 149,
      image: '/pasek.png',
    },
    {
      id: '10',
      name: 'Czapki',
      description: 'g ',
      price: 149,
      image: '/czapka.png',
    },
    {
      id: '11',
      name: 'Akcesoria',
      description: 'g ',
      price: 149,
      image: '/portfel.png',
    },
  ])

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === 'left' ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="featured" className="py-20 px-4 bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Kategorie</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Produkty jakie posiadamy na sklepie, które możesz przeglądać i zamawiać.
            <br />
            <span className="block mt-2 text-zinc-500 text-sm"></span>
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full p-2 -ml-4 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <Reorder.Group
              axis="x"
              values={categories}
              onReorder={setCategories}
              className="flex gap-6 min-w-max px-4"
            >
              {categories.map((category) => (
                <Reorder.Item
                  key={category.id}
                  value={category}
                  className="w-[280px] cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    whileDrag={{
                      scale: 1.05,
                      boxShadow:
                        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <BackgroundGradient className="rounded-[22px] h-[400px] p-4 sm:p-6 bg-zinc-900 flex flex-col">
                      <div className="flex-shrink-0 h-[200px] flex items-center justify-center mb-4">
                        <Image
                          src={category.image || '/placeholder.svg'}
                          alt={category.name}
                          height={200}
                          width={200}
                          className="object-contain max-h-full max-w-full"
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <p className="text-base sm:text-xl text-white font-semibold mb-2">
                          {category.name}
                        </p>
                        <p className="text-sm text-zinc-400 mb-4 flex-grow line-clamp-3">
                          {category.description}
                        </p>
                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 mt-auto text-xs font-bold"></button>
                      </div>
                    </BackgroundGradient>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full p-2 -mr-4 shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </motion.div>
    </section>
  )
}
