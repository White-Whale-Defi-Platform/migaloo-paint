import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

export interface FetchLeaderboardPayload {
  leaderboard: {
    start_after?: string
    limit?: string
  }
}

export interface FetchLeaderboardResponse {
  leaderboard: Array<{
    painter: string
    strokes: string
    deposits: string
  }>
}

export const fetchLeaderboardPayload = (startAfter?: string, limit?: number): FetchLeaderboardPayload => (
  {
    leaderboard: {
      ...(startAfter === undefined ? {} : { start_after: startAfter }),
      ...(limit === undefined ? {} : { limit: limit.toString() })
    }
  }
)

export const fetchLeaderboard = async (client: CosmWasmClient, contract: string, payload: FetchLeaderboardPayload): Promise<FetchLeaderboardResponse> => await client.queryContractSmart(contract, payload) as FetchLeaderboardResponse
