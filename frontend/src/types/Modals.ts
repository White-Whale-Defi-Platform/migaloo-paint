export enum ModalTypes {
  None = 'none',
  SelectWallet = 'select-wallet',
  ManageWallet = 'manage-wallet',
  Tile = 'tile',
  Loading = 'loading',
  Transaction = 'transaction',
}

export type NoneModalData = Record<string, never>
export type LoadingModalData = Record<string, never>
export type SelectWalletData = Record<string, never>
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

export type ModalData = LoadingModalData | NoneModalData | SelectWalletData | TileModalData | TransactionModalData
