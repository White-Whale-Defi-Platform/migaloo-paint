import { useEffect, useMemo, useState } from "react"
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { FetchStatsResponse, fetchStats } from '@/lib'

const useFetchStats = (client: CosmWasmClient | null, contract: string) => {
  const [stats, setStats] = useState<FetchStatsResponse>(null);
  const [loading, isLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchAndSet = async () => {
      if (!client) return
      isLoading(true)
      fetchStats(client, contract).then(setStats).catch(setError).finally(() => isLoading(false))
    }
    fetchAndSet()
    const timeout = setInterval(fetchAndSet, 10000)
    return () => clearInterval(timeout)
  }, [client])

  return useMemo(() => ({ stats: stats?.stats, loading, error }), [stats, loading, error]);
}

export default useFetchStats
