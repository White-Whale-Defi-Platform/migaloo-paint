export enum ModalTypes {
  None = 'none',
  SelectWallet = 'select-wallet',
  ManageWallet = 'manage-wallet',
  Tile = 'tile',
  Loading = 'loading',
  Transaction = 'transaction',
  RequestRejected = 'request-rejected'
}

export type NoneModalData = Record<string, never>
export type LoadingModalData = Record<string, never>
export type SelectWalletData = Record<string, never>
export type RequestRejectedModalData = Record<string, never>
export interface TileModalData {
  position: number
  color: string
  deposit: number
  painter: string
}
export interface TransactionModalData {
  hash: string
  code: number
  height: number
}

export type ModalData = LoadingModalData | NoneModalData | RequestRejectedModalData | SelectWalletData | TileModalData | TransactionModalData
