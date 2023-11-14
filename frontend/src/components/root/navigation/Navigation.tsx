'use client'
import Image from 'next/image'
import Link from 'next/link'
import NavButton from './NavButton'
import WalletNav from './WalletNav'

const Navigation = () => (
  <nav className="flex flex-row items-center w-full justify-between">
    <div className="flex flex-row items-center gap-4">
      <Link href='/'>
        <Image
          src="/migaloo-logo.svg"
          alt="Migaloo Logo"
          width={35}
          height={35}
          priority
        />
      </Link>
      <NavButton href='/canvas'>Canvas</NavButton>
      <NavButton href='/leaderboard'>Leaderboard</NavButton>
    </div>
    <WalletNav />
  </nav>
)

export default Navigation
