import type { ChainWalletContext } from '@cosmos-kit/core'
import { useChainWallet } from '@cosmos-kit/react'

export const useChainContext = (): ChainWalletContext => {
  const chain = useChainWallet('migaloo', 'keplr-extension')

  return chain
}
