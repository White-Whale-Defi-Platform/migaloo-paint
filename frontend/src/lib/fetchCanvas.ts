import { Tile } from '@/types';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export type FetchCanvasPayload = {
  canvas: {
    start_after?: string,
    limit?: string,
  }
}

export type FetchCanvasResponse = { canvas: Tile[] } | null

export const fetchCanvasPayload = (start_after?: string, limit?: string): FetchCanvasPayload => ({ canvas: { start_after, limit } })

export const fetchCanvas = async (client: CosmWasmClient, contract: string, start_after?: string, limit?: string): Promise<FetchCanvasResponse> => await client.queryContractSmart(contract, fetchCanvasPayload(start_after, limit))

