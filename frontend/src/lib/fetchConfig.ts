import { ENDPOINTS, MIGALOO_PAINT_CONTRACT_ADDRESS, ZERO } from '@/constants'
import type { AxiosResponse } from 'axios'
import { fetchSmartContract } from './fetchSmartContract'

export interface FetchConfigPayload {
  config: Record<string, never>
}

export interface FetchConfigResponse {
  config: {
    furnace: string
    size: string
    color: string
    coin: {
      denom: string
      amount: string
    }
  }
}

export const fetchConfigPayload = (): FetchConfigPayload => ({ config: {} })

export const fetchConfig = async (): Promise<FetchConfigResponse> => await fetchSmartContract(
  ENDPOINTS.migaloo.rest[ZERO],
  MIGALOO_PAINT_CONTRACT_ADDRESS,
  fetchConfigPayload()
)
  .then((response: AxiosResponse<{ data: FetchConfigResponse }>) => response.data.data)
