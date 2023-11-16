'use client'

import { ZERO } from '@/constants'
import { modalAtom } from '@/state'
import type { TransactionModalData } from '@/types'
import { exploreTx } from '@/util'
import { formatHash } from '@/util/format'
import { useRecoilValue } from 'recoil'
import { Box, Button, Card, CardBody, CardHeading, CardContent, Text } from '../common'

export const TransactionModal = (): JSX.Element => {
  const state = useRecoilValue(modalAtom)
  const { code, height, hash } = state.data as unknown as TransactionModalData
  return (
    <Card className="w-96">
      <CardHeading>Transaction</CardHeading>
      <CardBody>
        <Box className="w-full flex flex-row items-center justify-center">
          <Text>{code === ZERO ? 'Success' : 'Failure'}</Text>
        </Box>
        <CardContent className='w-full flex flex-row items-center justify-between'>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Height</Text>
            <Text>{height}</Text>
          </Box>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Hash</Text>
            <Text>{formatHash(hash)}</Text>
          </Box>
        </CardContent>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => window.open(exploreTx(hash), '_blank')}
        >
          Explore
        </Button>
      </CardBody>
    </Card >
  )
}
