import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

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

export const fetchCanvas = async (client: CosmWasmClient, contract: string, payload: FetchCanvasPayload): Promise<FetchCanvasResponse> => await client.queryContractSmart(contract, payload) as FetchCanvasResponse
