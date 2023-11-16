import { NATIVE_DENOM } from '@/constants'
import type { Token } from '@/types'
import { atom } from 'recoil'

export interface WalletState {
  name: string
  account: string
  balance: Token
}

export const walletAtom = atom<WalletState>(
  {
    key: 'walletAtom',
    default: {
      name: 'keplr-extension',
      account: '',
      balance: { denom: NATIVE_DENOM, amount: 0 }
    }
  }
)
