'use client'
import Status from './Status'
import { Text } from '@/components/common'

const Footer = (): JSX.Element => (
  <footer className="flex flex-row items-center justify-between w-full">
    <Text className="text-xs text-neutral-500">Build with Migaloo ADK</Text>
    <Status />
  </footer>
)

export default Footer
