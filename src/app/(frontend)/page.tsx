import { HeroSection } from "@/components/hero-section"
import { FeaturedSection } from "@/components/featured-section"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer"
import { getPayload } from "payload"
import config from '../../payload.config'


export default async function Home() {
  const payload = await getPayload({ config })

  const wears = await payload.find({
    collection: 'wears',
    depth: 2,
  }).then((res) => res.docs)

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <ProductsSection wears={wears} />
      <StackedCircularFooter />
    </main>
  )
}

