import type { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import type { Coin } from '@cosmjs/stargate'

export interface FetchBalanceResponse {
  balance: Coin
}

export const fetchBalance = async (client: CosmWasmClient, address: string, denom: string): Promise<FetchBalanceResponse> => ({ balance: await client.getBalance(address, denom) })
