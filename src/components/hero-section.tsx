import { Hero } from "@/components/ui/hero"

export function HeroSection() {
  return (
    <Hero
      title="URBAN THREADS"
      subtitle="Exclusive streetwear drops. Limited editions. Authentic style."
      actions={[
        {
          label: "Shop Collection",
          href: "#products",
          variant: "default",
        },
        {
          label: "About Us",
          href: "#about",
          variant: "outline",
        },
      ]}
      titleClassName="text-5xl md:text-6xl font-extrabold text-white"
      subtitleClassName="text-lg md:text-xl max-w-[600px] text-zinc-400"
      actionsClassName="mt-8"
      className="bg-zinc-950"
      id="home"
    />
  )
}

