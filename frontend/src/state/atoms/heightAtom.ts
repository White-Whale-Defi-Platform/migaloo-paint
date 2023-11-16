import type { Async } from '@/types'
import { atom } from 'recoil'

export interface Height {
  height: number
}

export interface HeightState extends Height, Async { }

export const heightAtom = atom<HeightState>(
  {
    key: 'heightAtom',
    default: {
      height: 0,
      loading: true,
      error: null
    }
  }
)
