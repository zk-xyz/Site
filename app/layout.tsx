import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Registry } from '@/registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ELIZA Chat',
  description: 'A modern implementation of ELIZA using Claude',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="grammarly-extension" content="disabled" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Registry>{children}</Registry>
      </body>
    </html>
  )
}