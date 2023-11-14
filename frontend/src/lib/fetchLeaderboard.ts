import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export type FetchLeaderboardPayload = {
  leaderboard: {
    start_after?: string,
    limit?: string,
  }
}

export type FetchLeaderboardResponse = {
  leaderboard: {
    painter: string,
    strokes: string,
    deposits: string,
  }[]
} | null


export const fetchLeaderboardPayload = (start_after?: string, limit?: string): FetchLeaderboardPayload => (
  {
    leaderboard: {
      ...(start_after ? { start_after } : {}),
      ...(limit ? { limit } : {}),
    }
  }
)

export const fetchLeaderboard = async (client: CosmWasmClient, contract: string, start_after?: string, limit?: string): Promise<FetchLeaderboardResponse> => await client.queryContractSmart(contract, fetchLeaderboardPayload(start_after, limit))
