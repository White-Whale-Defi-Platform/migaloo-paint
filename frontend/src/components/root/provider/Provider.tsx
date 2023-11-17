'use client'
import type { FC, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { ChainProvider } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import { wallets as keplr } from '@cosmos-kit/keplr-extension'
import DataProvider from './DataProvider'
import { ENDPOINTS } from '@/constants'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={[...keplr]} // Hack: Cosmos Kit is broken; just use one wallet.
        walletModal={() => <></>} // Hack: Cosmos Kit is broken; use internal modal manager.
        endpointOptions={{
          isLazy: true,
          endpoints: ENDPOINTS
        }}>
        <DataProvider>
          {children}
        </DataProvider>
      </ChainProvider>
    </RecoilRoot >
  )
}

export default Provider
