'use client'
import { FC, ReactNode, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil'
import { canvasAtom, configAtom, heightAtom, leaderboardAtom, statsAtom } from '@/state';
import { useCosmWasmClient, useFetchCanvas, useFetchConfig, useFetchHeight, useFetchLeaderboard, useFetchStats } from '@/hooks';

const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { cosmWasmClient } = useCosmWasmClient()

  const [{ config: { contracts: { paint } } }, setConfig] = useRecoilState(configAtom)
  const setHeight = useSetRecoilState(heightAtom)
  const setCanvas = useSetRecoilState(canvasAtom)
  const setLeaderboard = useSetRecoilState(leaderboardAtom)
  const setStats = useSetRecoilState(statsAtom)

  const fetchConfigResponse = useFetchConfig(cosmWasmClient, paint)
  const fetchCanvasResponse = useFetchCanvas(cosmWasmClient, paint)
  const fetchLeaderboardResponse = useFetchLeaderboard(cosmWasmClient, paint)
  const fetchStatsResponse = useFetchStats(cosmWasmClient, paint)
  const fetchHeightResponse = useFetchHeight(cosmWasmClient)

  useEffect(() => {
    const { config, loading, error } = fetchConfigResponse
    setConfig(current => ({
      config: {
        canvas: {
          size: config?.config.size ?? current.config.canvas.size,
          color: config?.config.color ?? current.config.canvas.color,
          denom: config?.config.coin.denom ?? current.config.canvas.denom,
          deposit: config?.config.coin.amount ?? current.config.canvas.deposit,
        },
        contracts: {
          paint: current.config.contracts.paint,
          furnace: config?.config.furnace ?? current.config.contracts.furnace,
        }
      },
      loading,
      error,
    }));

  }, [fetchConfigResponse]);

  useEffect(
    () => setCanvas(current => ({
      ...fetchCanvasResponse,
      canvas: fetchCanvasResponse.canvas ?? current.canvas,
    })),
    [fetchCanvasResponse],
  )
  useEffect(
    () => setLeaderboard(current => ({
      ...fetchLeaderboardResponse,
      leaderboard: fetchLeaderboardResponse.leaderboard?.map(e => ({ painter: e.painter, deposits: Number(e.deposits), strokes: Number(e.strokes) })) ?? current.leaderboard,
    })),
    [fetchLeaderboardResponse],
  )
  useEffect(
    () => setHeight(current => ({
      height: Number(fetchHeightResponse.height) ?? current.height,
      loading: fetchHeightResponse.loading,
      error: fetchHeightResponse.error,
    })),
    [fetchHeightResponse],
  )
  useEffect(
    () => setStats(current => ({
      stats: {
        deposits: Number(fetchStatsResponse.stats?.deposits) ?? current.stats.deposits,
        strokes: Number(fetchStatsResponse.stats?.strokes) ?? current.stats.strokes,
      },
      loading: fetchStatsResponse.loading,
      error: fetchStatsResponse.error
    })),
    [fetchStatsResponse],
  )

  return <>{children}</>;
};

export default DataProvider