import { atom } from "recoil";

type LeaderboardEntry = {
  painter: string;
  strokes: number;
  deposits: number;
};

type LeaderboardState = {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error: unknown;
};

const leaderboardAtom = atom<LeaderboardState>({
  key: 'leaderboardAtom',
  default: {
    leaderboard: Array<LeaderboardEntry>(),
    loading: false,
    error: null,
  },
});

export default leaderboardAtom