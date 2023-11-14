import { useState, useEffect, useMemo } from 'react';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import useChainContext from './useChainContext';

const useCosmWasmClient = () => {
  const chain = useChainContext()
  const [signingCosmWasmClient, setSigningCosmWasmClient] = useState<SigningCosmWasmClient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const initClients = async () => {
      setLoading(true);
      chain.getSigningCosmWasmClient().then(setSigningCosmWasmClient).catch(setError).finally(() => setError(false))
    }
    if (chain.isWalletConnected) {
      initClients();
    }

    return () => { };
  }, [chain.isWalletConnected]);

  return useMemo(() => ({ signingCosmWasmClient, error, loading }), [signingCosmWasmClient, loading, error])
};

export default useCosmWasmClient;
