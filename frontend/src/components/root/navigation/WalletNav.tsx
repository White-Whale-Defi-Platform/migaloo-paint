'use client'
import { WalletStatus } from '@cosmos-kit/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { modalAtom, walletAtom } from '@/state'
import { ModalTypes } from '@/types/modals'
import { formatBalance } from '@/util'
import { useChainContext } from '@/hooks'

const WalletNav = (): JSX.Element => {
  const setModal = useSetRecoilState(modalAtom)
  const chainContext = useChainContext()
  const wallet = useRecoilValue(walletAtom)

  switch (chainContext.status) {
    case WalletStatus.Connected:
      return (
        <button
          className="text-md px-1 rounded-2xl border border-solid border-neutral-600 hover:bg-neutral-600 hover:bg-opacity-40 hover:border-neutral-400"
          onClick={() => setModal({ data: {}, type: ModalTypes.ManageWallet })}
        >
          <div className='flex flex-col p-1 items-end'>
            <p className='text-xs'>{chainContext.username}</p>
            <p className='text-xs'>{`${formatBalance(Number(wallet.balance.amount))} WHALE`}</p>
          </div>
        </button >
      )
    default:
      return (
        <button
          className={'text-md font-medium p-2 rounded-2xl bg-green-500 bg-opacity-20 text-green-400 hover:bg-green-400 hover:bg-opacity-40'}
          onClick={(e) => {
            e.preventDefault()
            void chainContext.connect()
          }}
        >
          Connect Keplr
        </button>
      )
  }
}

export default WalletNav
