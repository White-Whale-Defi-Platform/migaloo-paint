import type { Async } from '@/types'
import { atom } from 'recoil'

export interface LeaderboardEntry {
  painter: string
  strokes: number
  deposits: number
}

export interface Leaderboard {
  leaderboard: LeaderboardEntry[]
}

export interface LeaderboardState extends Leaderboard, Async { }

export const leaderboardAtom = atom<LeaderboardState>({
  key: 'leaderboardAtom',
  default: {
    leaderboard: [],
    loading: false,
    error: null
  }
})
