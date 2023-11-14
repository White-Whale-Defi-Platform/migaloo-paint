import { walletAtom } from "@/state"
import { useChain, useChainWallet } from "@cosmos-kit/react"
import { useRecoilValue } from "recoil"

const useChainContext = () => {
  const wallet = useRecoilValue(walletAtom)
  //const chain = useChainWallet("migaloo", wallet, true)
  const chain = useChain("migaloo")
  return chain
}

export default useChainContext