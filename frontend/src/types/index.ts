export * from './modals'
export * from './msgs'

export interface Async {
  loading: boolean
  error: Error | null
}

export interface Token {
  denom: string
  amount: number
}
