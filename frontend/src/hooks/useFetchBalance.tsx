import { useState, useEffect, useMemo } from 'react';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Coin } from "@cosmjs/stargate";
import { fetchBalance } from '@/lib';

const useFetchBalance = (client: CosmWasmClient | null, address: string, denom: string) => {
  const [balance, setBalance] = useState<Coin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, isLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndSet = async () => {
      if (!client) return
      isLoading(true)
      fetchBalance(client, address, denom)
        .then((respone) => {
          setBalance(respone)
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

  return useMemo(() => ({ balance, loading, error }), [balance, loading, error]);
};

export default useFetchBalance;
