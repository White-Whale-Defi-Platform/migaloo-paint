import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

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

export const fetchConfig = async (client: CosmWasmClient, contract: string, payload: FetchConfigPayload): Promise<FetchConfigResponse> => await client.queryContractSmart(contract, payload) as FetchConfigResponse
