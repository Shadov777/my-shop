'use client'

import { Icons } from '@/components/ui/icons'
// import { Button } from "@/components/ui/button"
// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Dodajemy setTimeout aby dać przeglądarce czas na przetworzenie
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      console.error(`Element o ID "${sectionId}" nie został znaleziony`)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-zinc-950 py-12 text-zinc-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Icons.logo className="h-6 w-6" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="hover:text-primary cursor-pointer transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
            >
              Home
            </a>
            <a
              href="#products"
              className="hover:text-primary cursor-pointer transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('products')
              }}
            >
              Produkty
            </a>
            <a
              href="#featured"
              className="hover:text-primary cursor-pointer transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('featured')
              }}
            >
              Kategorie
            </a>
            <a
              href="#about"
              className="hover:text-primary cursor-pointer transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('about')
              }}
            >
              O nas
            </a>
          </nav>
          {/* <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button> */}
          {/* </div> */}
          <div className="text-center">
            <p className="text-sm text-zinc-400">
              © {new Date().getFullYear()} TswStore. Wszelkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
