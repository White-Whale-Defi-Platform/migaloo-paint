'use client'

import { useState, useEffect, useMemo } from 'react'
import { fetchLeaderboard } from '@/lib'
import { FETCH_INTERVAL, LEADERBOAD_FETCH_LIMIT, ONE } from '@/constants'
import type { Leaderboard, LeaderboardEntry } from '@/state'
import type { Async } from '@/types'
import { useCosmWasmClient } from './useCosmWasmClient'

export interface useFetchLeaderboardResult extends Async {
  leaderboard: Leaderboard | null
}

export const useFetchLeaderboard = (): useFetchLeaderboardResult => {
  const { client } = useCosmWasmClient()
  const [result, setResult] = useState<useFetchLeaderboardResult>({ leaderboard: null, loading: false, error: null })

  useEffect(() => {
    const fetchAndSet = (): void => {
      if (client === null) return
      setResult(prev => ({ ...prev, loading: true }))

      const fetchAllEntries = async (): Promise<Leaderboard> => {
        let startAfter: string | undefined
        let allEntriesFetched = false
        let leaderboard: LeaderboardEntry[] = []

        while (!allEntriesFetched) {
          const response = await fetchLeaderboard(startAfter)
          leaderboard = [...leaderboard, ...response.leaderboard.map(({ painter, strokes, deposits }) => ({ painter, strokes: Number(strokes), deposits: Number(deposits) }))]

          if (response.leaderboard.length < LEADERBOAD_FETCH_LIMIT) {
            allEntriesFetched = true
          } else {
            startAfter = response.leaderboard.at(-ONE)?.painter
          }
        }

        return { leaderboard }
      }

      fetchAllEntries()
        .then(leaderboard => setResult(prev => ({ ...prev, leaderboard, error: null })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }

    fetchAndSet()
    const interval = setInterval(() => fetchAndSet, FETCH_INTERVAL)
    return () => clearInterval(interval)
  },
  [client]
  )

  return useMemo(() => result, [result])
}
