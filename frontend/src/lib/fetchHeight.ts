import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

export interface FetchHeightResponse {
  height: number
}

export const fetchHeight = async (client: CosmWasmClient): Promise<FetchHeightResponse> => ({ height: await client.getHeight() })
