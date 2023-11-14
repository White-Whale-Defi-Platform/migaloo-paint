'use client'
import { WalletStatus } from '@cosmos-kit/core';
import { useChainContext, useCosmWasmClient, useFetchBalance } from '@/hooks';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@/state';
import { Modals } from '@/types/Modals';
import { formatBalance } from '@/util';

const WalletNav = () => {
  const chain = useChainContext()
  const setModal = useSetRecoilState(modalAtom)
  const { cosmWasmClient } = useCosmWasmClient();
  const { balance } = useFetchBalance(cosmWasmClient, chain.address ?? "", 'uwhale');

  switch (chain.status) {
    case WalletStatus.Connected:
      return (
        <button
          className="text-md px-1 rounded-2xl border border-solid border-neutral-600 hover:bg-neutral-600 hover:bg-opacity-40 hover:border-neutral-400"
          onClick={() => setModal(current => ({ ...current, type: Modals.ManageWallet }))}
        >
          <div className='flex flex-col p-1 items-end'>
            <p className='text-xs'>{chain.username}</p>
            <p className='text-xs'>{`${formatBalance(Number(balance?.amount))} WHALE`}</p>
          </div>
        </button >
      )
    default:
      return (
        <button
          className={`text-md font-medium p-2 rounded-2xl bg-green-500 bg-opacity-20 text-green-400 hover:bg-green-400 hover:bg-opacity-40`}
          onClick={() => setModal(current => ({ ...current, type: Modals.SelectWallet }))}
        >
          Connect
        </button>
      )
  }
}

export default WalletNav