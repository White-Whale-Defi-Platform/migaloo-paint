import { ADDRESS_FORMAT_LENGTH, BALANCE_FORMAT_DECIMALS, DECIMALS, HASH_FORMAT_LENGTH } from '@/constants'

export const formatHash = (hash: string): string => '...' + hash.slice(hash.length - HASH_FORMAT_LENGTH, hash.length)
export const formatAddress = (address: string): string => '...' + address.slice(address.length - ADDRESS_FORMAT_LENGTH, address.length)
export const formatBalance = (balance: number): string => (balance / DECIMALS).toFixed(BALANCE_FORMAT_DECIMALS)
