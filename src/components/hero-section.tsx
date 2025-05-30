import { Hero } from '@/components/ui/hero'

export function HeroSection() {
  return (
    <Hero
      title="Tsw Store"
      subtitle="Najlepszej jakości odzież i akcesoria oraz najlepsze ceny. Sprawdź naszą ofertę i przekonaj się sam!"
      actions={[
        {
          label: 'Nasze Produkty',
          href: '#products',
          variant: 'default',
        },
        {
          label: 'O Nas',
          href: '#about',
          variant: 'outline',
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
