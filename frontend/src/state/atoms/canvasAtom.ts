import type { Async } from '@/types'
import { atom } from 'recoil'

export interface Tile {
  painter: string
  color: string
  deposit: number
}

export interface Canvas {
  tiles: Tile[]
}

export interface CanvasState extends Canvas, Async { }

export const canvasAtom = atom<CanvasState>(
  {
    key: 'canvasAtom',
    default: {
      tiles: [],
      loading: true,
      error: null
    }
  }
)
