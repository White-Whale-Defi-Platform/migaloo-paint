'use client'

import { modalAtom } from "@/state"
import { formatHash } from "@/util/format"
import { useRecoilValue } from "recoil"
import { Box, Button, Card, CardBody, CardHeading, Text } from "../common"
import CardContent from "../common/card/CardContent"

const TransactionModal = () => {
  const state = useRecoilValue(modalAtom)
  return (
    <Card className="w-96">
      <CardHeading>Transaction</CardHeading>
      <CardBody>
        <Box className="w-full flex flex-row items-center justify-center">
          <Text>{state.data.code === 0 ? "Success" : "Failure"}</Text>
        </Box>
        <CardContent className='w-full flex flex-row items-center justify-between'>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Height</Text>
            <Text>{state.data.height}</Text>
          </Box>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Hash</Text>
            <Text>{formatHash(state.data.transactionHash)}</Text>
          </Box>
        </CardContent>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.open(`https://ping.pub/migaloo/tx/${state.data.transactionHash}`, '_blank')}
        >
          Explore
        </Button>
      </CardBody>
    </Card >
  )
}

export default TransactionModal