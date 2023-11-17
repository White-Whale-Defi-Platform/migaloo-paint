'use client'

import { useEffect, useMemo, useState } from 'react'
import { fetchConfig } from '@/lib'
import type { Config } from '@/state'
import type { Async } from '@/types'
import { MIGALOO_PAINT_CONTRACT_ADDRESS } from '@/constants'
import { useCosmWasmClient } from './useCosmWasmClient'

export interface UseFetchConfigResult extends Async {
  config: Config | null
}

export const useFetchConfig = (): UseFetchConfigResult => {
  const { client } = useCosmWasmClient()
  const [result, setResult] = useState<UseFetchConfigResult>({ config: null, loading: false, error: null })

  useEffect(() => {
    const fetchAndSet = (): void => {
      if (client === null) return
      setResult(prev => ({ ...prev, loading: true }))
      fetchConfig()
        .then(({ config: { furnace, color, size, coin: { denom, amount } } }) => setResult(prev => ({
          ...prev,
          config: {
            contracts: {
              paint: MIGALOO_PAINT_CONTRACT_ADDRESS,
              furnace
            },
            canvas: {
              size: Number(size),
              color,
              denom,
              deposit: Number(amount)
            }
          },
          error: null
        })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }
    fetchAndSet()
  },
  [client]
  )

  return useMemo(() => result, [result])
}
