import { useState, useEffect, useMemo } from 'react';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import useChainContext from './useChainContext';

const useCosmWasmClient = () => {
  const chain = useChainContext()
  const [cosmWasmClient, setCosmWasmClient] = useState<CosmWasmClient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const initClients = async () => {
      setLoading(true);
      chain.getCosmWasmClient().then(setCosmWasmClient).catch(setError).finally(() => setError(false))
    }
    initClients();
    return () => { };
  }, []);

  return useMemo(() => ({ cosmWasmClient, error, loading }), [cosmWasmClient, loading, error])
};

export default useCosmWasmClient;
