'use client'
export const SelectWalletModal = (): JSX.Element => <></>

/*
import { modalAtom, walletAtom } from '@/state'
import Image from 'next/image'
import { ModalTypes } from '@/types/modals'
import { Card, CardHeading, CardBody, Button, CardContent } from '@/components/common'
import { useChainContext } from '@/hooks'
import { useChainWallet } from '@cosmos-kit/react'

const SelectWalletModal = (): JSX.Element => {
  const chainContext = useChainContext()
  const setModalState = useChainWallet('migaloo', "keplr-extension")

  return (
    <Card className="w-96">
      <CardHeading>Select Wallet</CardHeading>
      <CardBody>
        <CardContent className="w-full flex flex-col">
          {chainContext.walletRepo.wallets.map((wallet) => (
            <Button
              key={wallet.walletName}
              variant="secondary"
              className="w-full flex flex-row items-center justify-between"
              onClick={
                e => {
                  e.preventDefault()
                  void wallet.connect()
                  setModalState({ data: {}, type: ModalTypes.None })
                }
              }
            >
              <Image
                src={wallet.walletInfo.logo?.toString() ?? ''}
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
*/
