import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export type FetchConfigPayload = {
  config: {}
}

export type FetchConfigResponse = {
  config: {
    furnace: string,
    size: string,
    color: string,
    coin: {
      denom: string,
      amount: string
    }
  }
} | null

export const fetchConfigPayload = (): FetchConfigPayload => ({ config: {} })

export const fetchConfig = async (client: CosmWasmClient, contract: string): Promise<FetchConfigResponse> => await client.queryContractSmart(contract, fetchConfigPayload())

