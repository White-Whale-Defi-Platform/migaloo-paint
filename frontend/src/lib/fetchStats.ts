import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export type FetchStatsPayload = {
  stats: {}
}

export type FetchStatsResponse = {
  stats: {
    strokes: string,
    deposits: string,
  }
} | null

export const fetchStatsPayload = (): FetchStatsPayload => ({ stats: {} })

export const fetchStats = async (client: CosmWasmClient, contract: string): Promise<FetchStatsResponse> => await client.queryContractSmart(contract, fetchStatsPayload())
