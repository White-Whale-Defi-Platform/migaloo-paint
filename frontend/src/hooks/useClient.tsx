import { useState, useEffect } from 'react';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import useChainContext from './useChain';

const useClient = () => {
  const chain = useChainContext()
  const [client, setClient] = useState<CosmWasmClient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initClient = async () => {
      setLoading(true);
      try {
        const newClient = await chain.getCosmWasmClient();
        setClient(newClient);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initClient();

    return () => {
    };
  }, []);

  return { client, error, loading };
};

export default useClient;
