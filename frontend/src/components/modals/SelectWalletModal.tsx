'use client'
import { modalAtom } from "@/state"
import { useChain } from "@cosmos-kit/react"
import { useSetRecoilState } from "recoil"
import Image from 'next/image';
import { Modals } from "@/types/Modals";
import { Card, CardHeading, CardBody, Button, Container } from '@/components/common'
import CardContent from "../common/card/CardContent";

const SelectWalletModal = () => {
  const chain = useChain("migaloo")
  const setModalState = useSetRecoilState(modalAtom)

  return (
    <Card className="w-96">
      <CardHeading>Select Wallet</CardHeading>
      <CardBody>
        <CardContent className="w-full flex flex-col">
          {chain.walletRepo?.wallets.map((wallet) => (
            <Button
              key={wallet.walletName}
              variant="secondary"
              className="w-full flex flex-row items-center justify-between"
              onClick={
                e => {
                  e.preventDefault()
                  wallet.connect()
                  setModalState(current => ({ ...current, type: Modals.None }))
                }
              }
            >
              <Image
                src={wallet.walletInfo.logo?.toString() ?? ""}
                alt={`${wallet.walletInfo.name} Logo`}
                width={32}
                height={32}
              />
              <span>{wallet.walletInfo.prettyName}</span>
            </Button>
          ))}
        </CardContent>
      </CardBody>
    </Card>
  )
}

export default SelectWalletModal
