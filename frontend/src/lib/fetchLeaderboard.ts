import { ENDPOINTS, LEADERBOAD_FETCH_LIMIT, MIGALOO_PAINT_CONTRACT_ADDRESS, ZERO } from '@/constants'
import type { AxiosResponse } from 'axios'
import { fetchSmartContract } from './fetchSmartContract'

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

export const fetchLeaderboard = async (startAfter?: string, limit: number = LEADERBOAD_FETCH_LIMIT): Promise<FetchLeaderboardResponse> => await fetchSmartContract(
  ENDPOINTS.migaloo.rest[ZERO],
  MIGALOO_PAINT_CONTRACT_ADDRESS,
  fetchLeaderboardPayload(startAfter, limit)
)
  .then((response: AxiosResponse<{ data: FetchLeaderboardResponse }>) => response.data.data)
