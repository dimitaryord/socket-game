'use client'
import './globals.css'
import Navigation from '@/components/Navigation'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Game App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' ' +  'flex flex-col justify-center items-center h-screen mx-auto'}>
        <header><Navigation /></header>
        <main className="flex-grow flex justify-center items-center" >{children}</main>
      </body>
    </html>
  )
}
