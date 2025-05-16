"use client"

import { useRef, useState } from "react"
import { motion, Reorder } from "framer-motion"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export function FeaturedSection() {
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Hoodies",
      description: "Premium oversized hoodies with unique graphics and embroidery details.",
      price: 89,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "2",
      name: "Cargo Pants",
      description: "Tactical streetwear bottoms with multiple pockets and adjustable details.",
      price: 79,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "3",
      name: "Graphic Tees",
      description: "Limited edition graphic t-shirts featuring original artwork and designs.",
      price: 39,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "4",
      name: "Accessories",
      description: "Complete your look with our premium caps, beanies, and bags.",
      price: 29,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "5",
      name: "Sneakers",
      description: "Limited edition sneakers and footwear to complete your streetwear look.",
      price: 119,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "6",
      name: "Jackets",
      description: "Premium outerwear designed for style and functionality.",
      price: 149,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "7",
      name: "Sweatpants",
      description: "Comfortable and stylish sweatpants for everyday wear.",
      price: 69,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "8",
      name: "Beanies",
      description: "Stylish headwear to complete your streetwear outfit.",
      price: 24,
      image: "/placeholder.svg?height=400&width=400",
    },
  ])

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Categories</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Explore our collection by category. Each piece is designed with attention to detail and quality.
            <span className="block mt-2 text-zinc-500 text-sm">
              Drag and drop to reorder categories or use arrows to scroll.
            </span>
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full p-2 -ml-4 shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Reorder.Group axis="x" values={categories} onReorder={setCategories} className="flex gap-6 min-w-max px-4">
              {categories.map((category) => (
                <Reorder.Item
                  key={category.id}
                  value={category}
                  className="w-[280px] cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    whileDrag={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <BackgroundGradient className="rounded-[22px] h-[400px] p-4 sm:p-6 bg-zinc-900 flex flex-col">
                      <div className="flex-shrink-0 h-[200px] flex items-center justify-center mb-4">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          height={200}
                          width={200}
                          className="object-contain max-h-full max-w-full"
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <p className="text-base sm:text-xl text-white font-semibold mb-2">{category.name}</p>
                        <p className="text-sm text-zinc-400 mb-4 flex-grow line-clamp-3">{category.description}</p>
                        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 mt-auto text-xs font-bold">
                         
                        </button>
                      </div>
                    </BackgroundGradient>
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>

          <button
            onClick={() => scroll("right")}
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

