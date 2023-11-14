import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export type FetchHeightResponse = number | null

export const fetchHeight = async (client: CosmWasmClient): Promise<FetchHeightResponse> => await client.getHeight()
