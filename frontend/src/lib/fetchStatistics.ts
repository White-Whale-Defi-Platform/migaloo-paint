import { ENDPOINTS, MIGALOO_PAINT_CONTRACT_ADDRESS, ZERO } from '@/constants'
import type { AxiosResponse } from 'axios'
import { fetchSmartContract } from './fetchSmartContract'

export interface FetchStatisticsPayload {
  stats: Record<string, never>
}

export interface FetchStatisticsResponse {
  stats: {
    strokes: string
    deposits: string
  }
}

export const fetchStatisticsPayload = (): FetchStatisticsPayload => ({ stats: {} })

export const fetchStatistics = async (): Promise<FetchStatisticsResponse> => await fetchSmartContract(
  ENDPOINTS.migaloo.rest[ZERO],
  MIGALOO_PAINT_CONTRACT_ADDRESS,
  fetchStatisticsPayload()
)
  .then((response: AxiosResponse<{ data: FetchStatisticsResponse }>) => response.data.data)
