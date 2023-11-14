import { atom } from 'recoil';

const walletAtom = atom(
  {
    key: 'walletAtom',
    default: "keplr-extension"
  }
)

export default walletAtom
