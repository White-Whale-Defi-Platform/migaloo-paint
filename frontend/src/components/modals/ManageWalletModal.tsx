'use client'

import { useChainContext, useCosmWasmClient, useFetchBalance } from "@/hooks"
import { modalAtom } from "@/state"
import { Modals } from "@/types/Modals"
import Image from 'next/image';
import { useSetRecoilState } from "recoil"
import { Box, Button, Card, CardBody, CardHeading, Container, Text } from "@/components/common"

const ManageWalletModal = () => {
  const chain = useChainContext()
  const { cosmWasmClient } = useCosmWasmClient();
  const { balance } = useFetchBalance(cosmWasmClient, chain.address ?? "", 'uwhale');
  const setModalState = useSetRecoilState(modalAtom)

  return (
    <Card className="w-96">
      <CardHeading>Manage Wallet</CardHeading>
      <CardBody>
        <Box className="w-full flex flex-col gap-2">
          <Text className="text-left font-medium">Balance</Text>
          <Container className="flex flex-row items-center justify-between">
            <Text>{`${Number(balance?.amount) / 1_000_000} WHALE`}</Text>
            <Button variant="secondary">
              <a target='_blank' href='https://app.kado.money'>Buy</a>
            </Button>
          </Container>
        </Box>
        <Box className="w-full flex flex-col gap-2">
          <Text className="text-left font-medium">Wallet</Text>
          <Container className="flex flex-row items-center justify-between">
            <Image
              src={chain.wallet?.logo?.toString() ?? ""}
              alt={`${chain.wallet?.name} Logo`}
              width={32}
              height={32}
            />
            <Button
              variant="secondary"
              onClick={
                e => {
                  e.preventDefault()
                  chain.disconnect()
                  setModalState(current => ({ ...current, type: Modals.None }))
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

export default ManageWalletModal