import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Coin } from '@cosmjs/stargate';

export type FetchBalanceResponse = Coin | null

export const fetchBalance = async (client: CosmWasmClient, address: string, denom: string): Promise<FetchBalanceResponse> => await client.getBalance(address, denom)

