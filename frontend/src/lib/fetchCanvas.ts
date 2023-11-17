import { CANVAS_FETCH_LIMIT, ENDPOINTS, MIGALOO_PAINT_CONTRACT_ADDRESS, ZERO } from '@/constants'
import type { AxiosResponse } from 'axios'
import { fetchSmartContract } from './fetchSmartContract'

export interface FetchCanvasPayload {
  canvas: {
    start_after?: string
    limit?: string
  }
}

export interface FetchCanvasResponse {
  canvas: Array<{ painter: string, color: string, deposit: string }>
}

export const fetchCanvasPayload = (startAfter?: number, limit?: number): FetchCanvasPayload => (
  {
    canvas: {
      ...(startAfter === undefined ? {} : { start_after: startAfter.toString() }),
      ...(limit === undefined ? {} : { limit: limit.toString() })
    }
  }
)

export const fetchCanvas = async (startAfter?: number, limit: number = CANVAS_FETCH_LIMIT): Promise<FetchCanvasResponse> => await fetchSmartContract(
  ENDPOINTS.migaloo.rest[ZERO],
  MIGALOO_PAINT_CONTRACT_ADDRESS,
  fetchCanvasPayload(startAfter, limit)
)
  .then((response: AxiosResponse<{ data: FetchCanvasResponse }>) => response.data.data)
