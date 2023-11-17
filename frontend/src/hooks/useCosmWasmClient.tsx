'use client'
import { useState, useEffect, useMemo } from 'react'
import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useChainContext } from './useChainContext'
import type { Async } from '@/types'

export interface UseCosmWasmClientResult extends Async {
  client: CosmWasmClient | null
}

export const useCosmWasmClient = (): UseCosmWasmClientResult => {
  const chainContext = useChainContext()
  const [result, setResult] = useState<UseCosmWasmClientResult>({ client: null, loading: false, error: null })

  useEffect(
    () => {
      setResult(prev => ({ ...prev, loading: true }))
      chainContext.getCosmWasmClient()
        .then(client => setResult(prev => ({ ...prev, client, error: null })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    },
    // Hack: Cosmos Kit is broken; dependency changes frequently.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return useMemo(() => result, [result])
}
