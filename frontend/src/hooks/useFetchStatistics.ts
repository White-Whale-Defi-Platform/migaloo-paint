import { useEffect, useMemo, useState } from 'react'
import { fetchStats, fetchStatsPayload } from '@/lib'
import { FETCH_INTERVAL, MIGALOO_PAINT_CONTRACT_ADDRESS } from '@/constants'
import type { Statistics } from '@/state'
import type { Async } from '@/types'
import { useCosmWasmClient } from './useCosmWasmClient'

export interface UseFetchStatsisticsResult extends Async {
  statistics: Statistics | null
}

export const useFetchStatistics = (): UseFetchStatsisticsResult => {
  const { client } = useCosmWasmClient()
  const [result, setResult] = useState<UseFetchStatsisticsResult>({ statistics: null, loading: false, error: null })

  useEffect(
    () => {
      const fetchAndSet = (): void => {
        if (client === null) return
        setResult(prev => ({ ...prev, loading: true }))
        fetchStats(client, MIGALOO_PAINT_CONTRACT_ADDRESS, fetchStatsPayload())
          .then(({ stats: { strokes, deposits } }) => setResult(prev => ({ ...prev, statistics: { strokes: Number(strokes), deposits: Number(deposits) }, error: null })))
          .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
          .finally(() => setResult(prev => ({ ...prev, loading: false })))
      }

      fetchAndSet()
      const intervalId = setInterval(fetchAndSet, FETCH_INTERVAL)
      return () => clearInterval(intervalId)
    },
    [client]
  )

  return useMemo(() => result, [result])
}
