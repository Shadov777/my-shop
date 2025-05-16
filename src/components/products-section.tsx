"use client"

import { useState, useRef, useEffect } from "react"
import { InteractiveCheckout } from "@/components/ui/interactive-checkout"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Wear } from "@/payload-types"

type ProductsSectionProps = {
  wears?: Wear[]
}

export function ProductsSection({ wears = [] }: ProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const [filterHeight, setFilterHeight] = useState<number | "auto">("auto")

  // Extract unique categories from wears, safely handling undefined values
  const categories = Array.from(
    new Set(
      wears
        ?.filter((product) => product?.category) // Filter out products without category
        .map((product) => product.category) || [],
    ),
  )

  // Measure the height of the filter container when categories change
  useEffect(() => {
    if (filterRef.current && showCategoryFilter) {
      const height = filterRef.current.scrollHeight
      setFilterHeight(height)
    }
  }, [categories, showCategoryFilter])

  const filteredProducts =
    wears?.filter((product) => {
      // Skip products without required properties
      if (!product?.name || !product?.category || !product?.color) {
        return false
      }

      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.color.toLowerCase().includes(searchLower)

      const matchesCategory = selectedCategory === null || product.category === selectedCategory

      return matchesSearch && matchesCategory
    }) || []

  const handleCategorySelect = (category: string) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
  }

  // Animation variants for the filter dropdown
  const filterVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      marginBottom: 0,
      overflow: "hidden",
    },
    visible: {
      height: filterHeight,
      opacity: 1,
      marginBottom: 16,
      overflow: "hidden",
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      marginBottom: 0,
      overflow: "hidden",
      transition: {
        height: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
  }

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

    .products-container {
      max-height: 70vh;
      overflow-y: auto;
      padding-right: 10px;
      margin-right: -2px;
    }
  `

  return (
    <section id="products" className="py-20 px-4 bg-zinc-950">
      <style jsx>{scrollbarStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Shop Collection</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Browse our latest streetwear drops. Limited quantities available.
          </p>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-zinc-500" />
                </div>
                <Input
                  type="search"
                  placeholder="Search for hoodies, tees, pants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
                />
              </div>

              {categories.length > 0 && (
                <Button
                  variant="outline"
                  className={cn(
                    "flex items-center gap-2 md:w-auto",
                    showCategoryFilter && "border-primary text-primary",
                  )}
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                >
                  <Filter className="h-4 w-4" />
                  Categories
                </Button>
              )}

              {(selectedCategory || searchQuery) && (
                <Button variant="ghost" className="text-zinc-400 hover:text-white md:w-auto" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {showCategoryFilter && categories.length > 0 && (
                <motion.div
                  ref={filterRef}
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 custom-scrollbar"
                >
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCategorySelect(category)}
                          className={selectedCategory === category ? "bg-primary" : ""}
                        >
                          {category}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {wears?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">No products available.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">No products found matching your criteria.</p>
              <button onClick={clearFilters} className="mt-4 text-primary hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="products-container custom-scrollbar">
              <InteractiveCheckout products={filteredProducts} />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
