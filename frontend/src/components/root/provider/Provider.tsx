'use client'
import { FC, PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { ChainProvider } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import { wallets as keplr } from '@cosmos-kit/keplr-extension'
import { wallets as station } from '@cosmos-kit/station-extension'
import { wallets as leap } from '@cosmos-kit/leap-extension'
import DataProvider from './DataProvider'

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <ChainProvider
        chains={chains}
        assetLists={assets}
        wallets={[...station, ...leap, ...keplr]}
        walletModal={() => <></>} // Hack: Cosmos Kit is broken.
        endpointOptions={{
          isLazy: true,
          endpoints: {
            migaloo: {
              rpc: ['https://migaloo-rpc.polkachu.com'],
              rest: ['https://migaloo-api.polkachu.com'],
            }
          }
        }}>
        <DataProvider>
          {children}
        </DataProvider>
      </ChainProvider>
    </RecoilRoot >
  )
}

export default Provider