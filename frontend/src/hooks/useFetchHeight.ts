import { useState, useEffect, useMemo } from 'react'
import { fetchHeight } from '@/lib'
import { FETCH_INTERVAL } from '@/constants'
import type { Height } from '@/state'
import type { Async } from '@/types'
import { useCosmWasmClient } from './useCosmWasmClient'

export interface UseFetchHeightResult extends Async {
  height: Height | null
}

export const useFetchHeight = (): UseFetchHeightResult => {
  const { client } = useCosmWasmClient()
  const [result, setResult] = useState<UseFetchHeightResult>({ height: null, loading: false, error: null })

  useEffect(() => {
    const fetchAndSet = (): void => {
      if (client === null) return
      setResult(prev => ({ ...prev, loading: true }))
      fetchHeight(client)
        .then(height => setResult(prev => ({ ...prev, height, error: null })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }

    fetchAndSet()
    const timeout = setInterval(fetchAndSet, FETCH_INTERVAL)
    return () => clearInterval(timeout)
  }, [client])

  return useMemo(() => result, [result])
}
