import { walletAtom } from "@/state"
import { useChainWallet } from "@cosmos-kit/react"
import { useRecoilValue } from "recoil"

const useChain = () => {
  const wallet = useRecoilValue(walletAtom)
  const chain = useChainWallet("migaloo", wallet, true)
  return chain
}

export default useChain