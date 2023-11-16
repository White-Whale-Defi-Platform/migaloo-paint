import { MIGALOO_PAINT_CONTRACT_ADDRESS } from '@/constants'
import type { Async } from '@/types'
import { atom } from 'recoil'

export interface Config {
  contracts: {
    paint: string
    furnace: string
  }
  canvas: {
    size: number
    color: string
    denom: string
    deposit: number
  }
}
export interface ConfigState extends Config, Async { }

export const configAtom = atom<ConfigState>(
  {
    key: 'configAtom',
    default: {
      contracts: {
        paint: MIGALOO_PAINT_CONTRACT_ADDRESS,
        furnace: ''
      },
      canvas: {
        size: 0,
        color: '',
        denom: '',
        deposit: 0
      },
      loading: true,
      error: null
    }
  }
)
