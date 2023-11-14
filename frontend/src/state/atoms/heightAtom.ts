import { atom } from 'recoil';

export type HeightState = {
  height: number,
  loading: boolean,
  error: unknown,
}

const heightAtom = atom<HeightState>(
  {
    key: 'heightAtom',
    default: {
      height: 0,
      loading: true,
      error: null
    }
  }
)

export default heightAtom
