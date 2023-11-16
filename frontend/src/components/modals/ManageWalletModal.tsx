'use client'

import { useChainContext } from '@/hooks'
import { modalAtom, walletAtom } from '@/state'
import { ModalTypes } from '@/types/modals'
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Box, Button, Card, CardBody, CardHeading, Container, Link, Text } from '@/components/common'
import { DECIMALS } from '@/constants'

export const ManageWalletModal = (): JSX.Element => {
  const chain = useChainContext()
  const wallet = useRecoilValue(walletAtom)
  const setModalState = useSetRecoilState(modalAtom)

  return (
    <Card className="w-96">
      <CardHeading>Manage Wallet</CardHeading>
      <CardBody>
        <Box className="w-full flex flex-col gap-2">
          <Text className="text-left font-medium">Balance</Text>
          <Container className="flex flex-row items-center justify-between">
            <Text>{`${Number(wallet.balance.amount) / DECIMALS} WHALE`}</Text>
            <Button variant="secondary">
              <Link target='_blank' href='https://app.kado.money' rel="noreferrer">Buy</Link>
            </Button>
          </Container>
        </Box>
        <Box className="w-full flex flex-col gap-2">
          <Text className="text-left font-medium">Wallet</Text>
          <Container className="flex flex-row items-center justify-between">
            <Image
              src={chain.wallet.logo?.toString() ?? ''}
              alt={`${chain.wallet.name} Logo`}
              width={32}
              height={32}
            />
            <Button
              variant="secondary"
              onClick={
                e => {
                  e.preventDefault()
                  void chain.disconnect()
                  setModalState({ data: {}, type: ModalTypes.None })
                }
              }
            >
              Disconnect
            </Button>
          </Container>
        </Box>
      </CardBody>
    </Card>
  )
}
