'use client'
import { type FC, useEffect, type PropsWithChildren } from 'react'
import { useSetRecoilState } from 'recoil'
import { canvasAtom, configAtom, heightAtom, leaderboardAtom, statisticsAtom, walletAtom } from '@/state'
import { useChainContext, useFetchAccountBalance, useFetchCanvas, useFetchConfig, useFetchHeight, useFetchLeaderboard, useFetchStatistics } from '@/hooks'

const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const chainContext = useChainContext()
  const setConfig = useSetRecoilState(configAtom)
  const setHeight = useSetRecoilState(heightAtom)
  const setCanvas = useSetRecoilState(canvasAtom)
  const setLeaderboard = useSetRecoilState(leaderboardAtom)
  const setStatistics = useSetRecoilState(statisticsAtom)
  const SetWallet = useSetRecoilState(walletAtom)

  const configFetch = useFetchConfig()
  const canvasFetch = useFetchCanvas()
  const leaderboardFetch = useFetchLeaderboard()
  const statisticsFetch = useFetchStatistics()
  const heightFetch = useFetchHeight()
  const accountBalanceFetch = useFetchAccountBalance()

  useEffect(() =>
    setConfig(current => (
      {
        canvas: {
          size: configFetch.config?.canvas.size ?? current.canvas.size,
          color: configFetch.config?.canvas.color ?? current.canvas.color,
          denom: configFetch.config?.canvas.denom ?? current.canvas.denom,
          deposit: configFetch.config?.canvas.deposit ?? current.canvas.deposit
        },
        contracts: {
          paint: current.contracts.paint,
          furnace: configFetch.config?.contracts.furnace ?? current.contracts.furnace
        },
        loading: configFetch.loading,
        error: configFetch.error
      })), [configFetch, setConfig])

  useEffect(
    () => setCanvas(current => (
      {
        tiles: canvasFetch.canvas?.tiles ?? current.tiles,
        loading: canvasFetch.loading,
        error: canvasFetch.error
      }
    )),
    [canvasFetch, setCanvas]
  )

  useEffect(
    () => setLeaderboard(current => ({
      leaderboard: leaderboardFetch.leaderboard?.leaderboard ?? current.leaderboard,
      loading: leaderboardFetch.loading,
      error: leaderboardFetch.error
    })),
    [leaderboardFetch, setLeaderboard]
  )
  useEffect(
    () => {
      setHeight(current => ({
        height: heightFetch.height?.height ?? current.height,
        loading: heightFetch.loading,
        error: heightFetch.error
      }))
    },
    [heightFetch, setHeight]
  )
  useEffect(
    () => setStatistics(current => ({
      deposits: statisticsFetch.statistics?.deposits ?? current.deposits,
      strokes: statisticsFetch.statistics?.strokes ?? current.strokes,
      loading: statisticsFetch.loading,
      error: statisticsFetch.error
    })),
    [statisticsFetch, setStatistics]
  )
  useEffect(
    () => SetWallet(current => ({
      ...current,
      balance: accountBalanceFetch.balance ?? current.balance
    })),
    [accountBalanceFetch, SetWallet]
  )

  useEffect(
    () => SetWallet(prev => ({ ...prev, account: chainContext.address ?? prev.account })),
    [chainContext.address, SetWallet]
  )

  return <>{children}</>
}

export default DataProvider
