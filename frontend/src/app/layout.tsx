import Layout from '@/components/root'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { PropsWithChildren, FC } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Migaloo Paint',
  description: 'Unleash your creativity on the canvas of Migaloo – the blockchain-powered collaborative art platform where every stroke makes a statement. Join artists worldwide and etch your work permanently in the blockchain. Each brush stroke is a transaction; each artwork is a community masterpiece. Draw, share, and be part of the ever-evolving digital mural that is owned by no one and drawn by everyone. Experience the confluence of art, technology, and community with Migaloo Paint.'
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <Layout>
        {children}
      </Layout>
    </body>
  </html>
)

export default RootLayout
