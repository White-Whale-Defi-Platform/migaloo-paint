'use client'

import { modalAtom } from '@/state'
import { ModalTypes } from '@/types/modals'
import { useRecoilState } from 'recoil'
import { useEffect, useRef } from 'react'
import SelectWalletModal from './SelectWalletModal'
import ManageWalletModal from './ManageWalletModal'
import TileModal from './TileModal'
import LoadingModal from './LoadingModal'
import TransactionModal from './TransactionModal'

const ModalManager = (): JSX.Element => {
  const [modalState, setModalState] = useRecoilState(modalAtom)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        setModalState({ data: {}, type: ModalTypes.None })
      }
    }
    window.addEventListener('mousedown', handleClickOutside)
    return () => { window.removeEventListener('mousedown', handleClickOutside) }
  }, [modalState.type, ref, setModalState])

  let Modal: JSX.Element
  switch (modalState.type) {
    case ModalTypes.SelectWallet:
      Modal = <SelectWalletModal />
      break
    case ModalTypes.ManageWallet:
      Modal = <ManageWalletModal />
      break
    case ModalTypes.Tile:
      Modal = <TileModal />
      break
    case ModalTypes.Loading:
      Modal = <LoadingModal />
      break
    case ModalTypes.Transaction:
      Modal = <TransactionModal />
      break
    default:
      Modal = <></>
  }

  return (
    <>
      {
        modalState.type !== ModalTypes.None &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={ref}>
            {Modal}
          </div>
        </div>
      }
    </>
  )
}

export default ModalManager
