'use client'

import { useState, useEffect, useMemo } from 'react'
import { fetchCanvas } from '@/lib'
import type { Canvas, Tile } from '@/state'
import type { Async } from '@/types'
import { CANVAS_FETCH_LIMIT, FETCH_INTERVAL } from '@/constants'
import { useCosmWasmClient } from './useCosmWasmClient'

export interface useFetchCanvasResult extends Async {
  canvas: Canvas | null
}

export const useFetchCanvas = (): useFetchCanvasResult => {
  const { client } = useCosmWasmClient()
  const [result, setResult] = useState<useFetchCanvasResult>({ canvas: null, loading: false, error: null })

  useEffect(() => {
    const fetchAndSet = (): void => {
      if (client === null) return
      setResult(prev => ({ ...prev, loading: true }))

      const fetchAllCanvasData = async (): Promise<Canvas> => {
        let startAfter = 0
        let allCanvasData: Tile[] = []
        let allTilesFetched = false

        while (!allTilesFetched) {
          const response = await fetchCanvas(startAfter)
          allCanvasData = [...allCanvasData, ...response.canvas.map(({ painter, color, deposit }) => ({ painter, color, deposit: Number(deposit) }))]

          if (response.canvas.length < CANVAS_FETCH_LIMIT) {
            allTilesFetched = true
          } else {
            startAfter += CANVAS_FETCH_LIMIT
          }
        }
        return { tiles: allCanvasData }
      }

      fetchAllCanvasData()
        .then(canvasData => setResult(prev => ({ ...prev, canvas: canvasData, error: null })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }

    fetchAndSet()
    const interval = setInterval(fetchAndSet, FETCH_INTERVAL)
    return () => clearInterval(interval)
  },
  [client]
  )

  return useMemo(() => result, [result])
}
