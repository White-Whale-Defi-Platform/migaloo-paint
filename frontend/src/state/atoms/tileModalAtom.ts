import { atom } from 'recoil';

export type TileModalState = {
  active: boolean,
  tile: {
    painter: string,
    color: string,
    deposit: number,
    position: number
  }
}

const tileModalAtom = atom<TileModalState>(
  {
    key: 'tileModalAtom',
    default: {
      active: false,
      tile: {
        painter: "",
        deposit: 0,
        color: "",
        position: 0
      }
    }
  }
)

export default tileModalAtom
