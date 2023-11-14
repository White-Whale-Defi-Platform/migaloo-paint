import { atom } from 'recoil';

export type StatsState = {
  stats: {
    strokes: number,
    deposits: number
  }
  loading: boolean,
  error: unknown,
}

const statsAtom = atom<StatsState>(
  {
    key: 'statsAtom',
    default: {
      stats: {
        strokes: 0,
        deposits: 0,
      },
      loading: true,
      error: null
    }
  }
)

export default statsAtom
