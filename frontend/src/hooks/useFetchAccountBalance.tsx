import { useState, useEffect, useMemo } from 'react'
import { fetchBalance } from '@/lib'
import type { Async, Token } from '@/types'
import { FETCH_INTERVAL, NATIVE_DENOM } from '@/constants'
import { walletAtom } from '@/state'
import { useRecoilValue } from 'recoil'
import { useCosmWasmClient } from './useCosmWasmClient'

export interface UseFetchAccountBalanceResult extends Async {
  balance: Token | null
}

export const useFetchAccountBalance = (): UseFetchAccountBalanceResult => {
  const { client } = useCosmWasmClient()
  const { account } = useRecoilValue(walletAtom)
  const [result, setResult] = useState<UseFetchAccountBalanceResult>({ balance: null, loading: false, error: null })

  useEffect(() => {
    const fetchAndSet = (): void => {
      if (client === null || account === '') return
      setResult(prev => ({ ...prev, loading: true }))

      fetchBalance(client, account, NATIVE_DENOM)
        .then(({ balance: { denom, amount } }) => setResult(prev => ({ ...prev, balance: { denom, amount: Number(amount) }, error: null })))
        .catch(error => setResult(prev => ({ ...prev, error: error as Error })))
        .finally(() => setResult(prev => ({ ...prev, loading: false })))
    }
    fetchAndSet()
    const timeout = setInterval(fetchAndSet, FETCH_INTERVAL)
    return () => clearInterval(timeout)
  }, [client, account])

  return useMemo(() => result, [result])
}
