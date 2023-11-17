'use client'

import { useState, useEffect, useMemo } from 'react'
import type { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import type { Async } from '@/types'
import { useChainContext } from './useChainContext'

export interface UseSigningCosmWasmClientResult extends Async {
  client: SigningCosmWasmClient | null
}

export const useSigningCosmWasmClient = (): UseSigningCosmWasmClientResult => {
  const chainContext = useChainContext()
  const [result, setResult] = useState<UseSigningCosmWasmClientResult>({ client: null, loading: false, error: null })

  useEffect(
    () => {
      setResult(prev => ({ ...prev, loading: true }))
      chainContext.getSigningCosmWasmClient()
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
