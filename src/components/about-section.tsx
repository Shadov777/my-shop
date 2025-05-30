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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">O Nas</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Dowiedz się więcej o swojej marce, naszej misji i tym, co wyróżnia Tsw Store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white">O Sklepie</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    Od ponad 2 lat z powodzeniem realizujemy zamówienia na nasze produkty, nie mając
                    nigdy żadnych problemów z jakością czy obsługą. Dzięki zaufaniu naszych klientów
                    postanowiliśmy stworzyć tę stronę, aby jeszcze bardziej ułatwić i przyspieszyć
                    proces zamawiania. Teraz wszystkie nasze produkty są dostępne w jednym miejscu,
                    a zakupy stają się wygodne, szybkie i bezproblemowe. Zapraszamy do korzystania!
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white">Dlaczego My?</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>Dzięki nam otrzymasz:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      Najlepszej jakości produkty. Korzystamy z najepszych jakosciowo produktów oraz
                      mamy swoich producentów
                    </li>
                    <li>Najlepsza jakość usług i bardzo szybki kontakt z klientem</li>
                    <li>Najszybszy czas dostawy</li>
                    <li>
                      Nie musisz sie martwić że przyjdzie ci list celny bo cała odpowiedzialność
                      bierzemy na siebie
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white">Dostawy</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    Dbamy o to, aby Twoje zamówienie dotarło do Ciebie szybko i bezpiecznie.
                    Standardowy czas realizacji dostawy od momentu złożenia zamówienia wynosi około
                    14 dni. Dokładamy wszelkich starań, aby przesyłka dotarła na czas, a Ty mógł
                    cieszyć się naszymi produktami bez zbędnych opóźnień.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white">Klienci</AccordionTrigger>
                <AccordionContent className="text-zinc-400">
                  <p>
                    Mamy na swoim koncie wiele zrealizowanych zamówień oraz szerokie grono
                    zadowolonych klientów, którzy chętnie do nas wracają. Każde zlecenie traktujemy
                    indywidualnie, dbając o najwyższą jakość usług i satysfakcję naszych odbiorców.
                  </p>
                  <p className="mt-2">
                    Dołącz do grona naszych klientów i przekonaj się, dlaczego warto nam zaufać!
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
                  src="333.svg"
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
