import { useState, useEffect, useMemo } from 'react';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { fetchLeaderboard, FetchLeaderboardResponse } from '@/lib';

const useFetchLeaderboard = (client: CosmWasmClient | null, contract: string) => {
  const [leaderboard, setLeaderboard] = useState<FetchLeaderboardResponse>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const limit = 100

  useEffect(() => {
    const fetchAndSet = (startAfter: string | undefined = undefined) => {
      if (!client) return
      setLoading(true)

      const fetchAllEntries = async (startAfter: string | undefined) => {
        let lastAccount: string | undefined = startAfter;
        let allEntriesFetched = false;
        let combinedLeaderboard = leaderboard?.leaderboard || [];

        while (!allEntriesFetched) {
          await fetchLeaderboard(client, contract, lastAccount).then(response => {
            if (!response || !response.leaderboard) {
              throw new Error('Invalid response');
            }

            combinedLeaderboard = [...combinedLeaderboard, ...response.leaderboard];

            if (Number(response.leaderboard.length) < limit) {
              allEntriesFetched = true;
            } else {
              lastAccount = response.leaderboard[response.leaderboard.length - 1]?.painter;
            }
          }).catch(setError);
        }

        return combinedLeaderboard;
      };

      fetchAllEntries(startAfter).then(leaderboard => setLeaderboard({ leaderboard })).finally(() => setLoading(false))
    };

    fetchAndSet();
    const interval = setInterval(() => fetchAndSet(), 10000);
    return () => clearInterval(interval);
  }, [client, contract])
  return useMemo(() => ({ leaderboard: leaderboard?.leaderboard, loading, error }), [leaderboard, loading, error]);
}

export default useFetchLeaderboard;
