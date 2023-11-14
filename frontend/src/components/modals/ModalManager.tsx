'use client'

import { modalAtom } from "@/state"
import { Modals } from "@/types/Modals"
import { useRecoilState } from "recoil"
import { useEffect, useRef } from "react";
import SelectWalletModal from "./SelectWalletModal";
import ManageWalletModal from "./ManageWalletModal";
import TileModal from "./TileModal";
import LoadingModal from "./LoadingModal";
import TransactionModal from "./TransactionModal";

const ModalManager = () => {
  const [modalState, setModalState] = useRecoilState(modalAtom)

  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setModalState(current => ({ ...current, type: Modals.None }))
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [modalState.type]);

  let Modal: JSX.Element
  switch (modalState.type) {
    case Modals.SelectWallet:
      Modal = <SelectWalletModal />
      break
    case Modals.ManageWallet:
      Modal = <ManageWalletModal />
      break
    case Modals.Tile:
      Modal = <TileModal />
      break
    case Modals.Loading:
      Modal = <LoadingModal />
      break
    case Modals.Transaction:
      Modal = <TransactionModal />
      break
    default:
      Modal = <></>
  }

  return (
    <>
      {
        modalState.type != Modals.None &&
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