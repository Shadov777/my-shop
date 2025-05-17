'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Us</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Learn more about our brand, our mission, and what makes URBAN THREADS different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white">Our Story</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    Founded in 2018, URBAN THREADS began as a small passion project between friends
                    who shared a love for streetwear culture. What started in a garage with just a
                    few designs has grown into a global brand that celebrates urban creativity and
                    self-expression.
                  </p>
                  <p className="mt-2">
                    Our journey has been defined by authenticity, quality, and a commitment to
                    pushing boundaries in streetwear design.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white">Our Mission</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    At URBAN THREADS, our mission is to create streetwear that empowers individuals
                    to express their unique identity. We believe clothing is more than fabric—it s a
                    statement, a form of self-expression, and a way to connect with like-minded
                    communities.
                  </p>
                  <p className="mt-2">
                    We re committed to creating limited edition pieces that stand out, using premium
                    materials and innovative designs that push the boundaries of streetwear.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white">Sustainability</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    We re committed to reducing our environmental footprint. Our sustainability
                    initiatives include:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Using organic and recycled materials whenever possible</li>
                    <li>Ethical manufacturing practices and fair wages</li>
                    <li>Minimal waste packaging made from recycled materials</li>
                    <li>Limited production runs to reduce excess inventory</li>
                    <li>Carbon-neutral shipping options</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white">Design Philosophy</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    Our design approach blends urban culture, contemporary art, and streetwear
                    heritage. Each collection tells a story and reflects current cultural movements
                    while maintaining a timeless appeal.
                  </p>
                  <p className="mt-2">
                    We collaborate with artists, musicians, and cultural icons to create unique
                    pieces that bridge the gap between fashion and art. Every detail matters—from
                    custom hardware to specialized printing techniques.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-white">Community</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    URBAN THREADS is more than a clothing brand—its a community. We support local
                    artists, sponsor skateparks, and host events that bring together people who
                    share our passion for streetwear culture.
                  </p>
                  <p className="mt-2">
                    Through our UT Community Initiative, we donate a portion of our profits to
                    programs that provide creative outlets for youth in underserved communities.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl opacity-50"></div>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Urban Threads team"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/30 blur-xl"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
