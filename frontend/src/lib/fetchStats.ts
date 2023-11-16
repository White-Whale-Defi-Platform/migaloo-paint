import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

export interface FetchStatsPayload {
  stats: Record<string, never>
}

export interface FetchStatsResponse {
  stats: {
    strokes: string
    deposits: string
  }
}

export const fetchStatsPayload = (): FetchStatsPayload => ({ stats: {} })

export const fetchStats = async (client: CosmWasmClient, contract: string, payload: FetchStatsPayload): Promise<FetchStatsResponse> => await client.queryContractSmart(contract, payload) as FetchStatsResponse
