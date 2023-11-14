'use client'
import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavButton: FC<{ children: ReactNode, href: string }> = ({ children, href }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className={`text-md font-medium p-2 rounded-2xl hover:bg-neutral-600 hover:bg-opacity-40 ${isActive ? 'text-green-500' : 'text-neutral-300'}`} >
      {children}
    </Link >
  )
}

export default NavButton
