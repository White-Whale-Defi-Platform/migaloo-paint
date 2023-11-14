import { Modals } from '@/types/Modals';
import { atom } from 'recoil';

export type ModalState = {
  type: Modals
  data: any
}

const modalAtom = atom<ModalState>(
  {
    key: 'modalAtom',
    default: {
      type: Modals.None,
      data: null
    }
  }
)

export default modalAtom
