import { useEffect, useMemo, useState } from "react"
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { FetchConfigResponse, fetchConfig } from '@/lib'

const useFetchConfig = (client: CosmWasmClient | null, contract: string) => {
  const [config, setConfig] = useState<FetchConfigResponse>(null);
  const [loading, isLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchAndSet = async () => {
      if (!client) return
      isLoading(true)
      fetchConfig(client, contract).then(setConfig).catch(setError).finally(() => isLoading(false))
    }
    fetchAndSet()
  }, [client, contract])

  return useMemo(() => ({ config, loading, error }), [config, loading, error]);
}

export default useFetchConfig
