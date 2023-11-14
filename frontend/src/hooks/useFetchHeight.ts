import { useState, useEffect, useMemo } from 'react';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { fetchHeight, FetchHeightResponse } from '@/lib';

const useFetchHeight = (client: CosmWasmClient | null) => {
  const [height, setHeight] = useState<FetchHeightResponse>(null);
  const [loading, isLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchAndSet = async () => {
      if (!client) return
      isLoading(true)
      fetchHeight(client)
        .then((respone) => {
          setHeight(respone)
          if (respone) {
            setError(null)
          }
        })
        .catch(setError)
        .finally(() => isLoading(false))
    }
    fetchAndSet()
    const timeout = setInterval(fetchAndSet, 6000)
    return () => clearInterval(timeout)
  }, [client])

  return useMemo(() => ({ height, loading, error }), [height, loading, error]);
}

export default useFetchHeight
