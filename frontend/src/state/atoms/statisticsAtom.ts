import { atom } from 'recoil'
import type { Async } from '@/types'

export interface Statistics {
  deposits: number
  strokes: number
}

export interface StatisticsState extends Statistics, Async { }

export const statisticsAtom = atom<StatisticsState>(
  {
    key: 'statisticsAtom',
    default: {
      strokes: 0,
      deposits: 0,
      loading: true,
      error: null
    }
  }
)
