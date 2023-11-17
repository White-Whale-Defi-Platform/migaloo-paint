import axios, { type AxiosResponse } from 'axios'

export const fetchSmartContract = async <T>(endpoint: string, contract: string, payload: T): Promise<AxiosResponse> => await axios.get(`${endpoint}/cosmwasm/wasm/v1/contract/${contract}/smart/${btoa(JSON.stringify(payload))}`)
