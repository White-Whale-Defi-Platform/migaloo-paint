import { Tile } from '@/types';
import { atom } from 'recoil';

export type CanvasState = {
  canvas: Tile[],
  loading: boolean,
  error: unknown,
}

const canvasAtom = atom<CanvasState>(
  {
    key: 'canvasAtom',
    default: {
      canvas: Array<Tile>(),
      loading: true,
      error: null,
    }
  }
)

export default canvasAtom
