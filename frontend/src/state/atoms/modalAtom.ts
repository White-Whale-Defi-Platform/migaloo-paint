import { type ModalData, ModalTypes } from '@/types/modals'
import { atom } from 'recoil'

export interface ModalState {
  type: ModalTypes
  data: ModalData
}

export const modalAtom = atom<ModalState>(
  {
    key: 'modalAtom',
    default: {
      type: ModalTypes.None,
      data: {}
    }
  }
)
