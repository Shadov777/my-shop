import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TswStore',
  description: 'streetwear store',
  keywords: ['streetwear', 'fashion', 'clothing', 'urban style', 'streetstyle'],
  authors: [{ name: 'TSW Team' }],
  viewport: 'width=device-width, initial-scale=1',
  creator: 'TSW Store',
  publisher: 'TSW Store',
  icons: {
    icon: '/favico.ico',
    apple: '/apple.png',
    shortcut: '/shortcut-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
