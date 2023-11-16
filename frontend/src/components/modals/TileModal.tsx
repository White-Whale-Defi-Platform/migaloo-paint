'use client'

import React, { useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useChainContext, useSigningCosmWasmClient } from '@/hooks'
import { createPaintMessage, exploreAccount, formatAddress, formatBalance, isHexColor } from '@/util'
import { configAtom, modalAtom } from '@/state'
import Box from '../common/Box'
import { Button, Text, CardContent, Card, CardHeading, CardBody, Container, Link } from '@/components/common'
import { ModalTypes, type TileModalData } from '@/types'
import { DECIMALS } from '@/constants'

export const TileModal = (): JSX.Element => {
  const [modalState, setModalState] = useRecoilState(modalAtom)
  const data = modalState.data as unknown as TileModalData
  const chainContext = useChainContext()
  const config = useRecoilValue(configAtom)
  const signingCosmWasmClient = useSigningCosmWasmClient()

  const [input, setInput] = React.useState({ color: data.color, deposit: (Number(data.deposit + DECIMALS) / DECIMALS).toString() })

  console.log(input.color)
  useEffect(() => { setInput({ color: data.color, deposit: (Number(data.deposit + DECIMALS) / DECIMALS).toString() }) }, [data])

  const onClick = (): void => {
    if (chainContext.isWalletConnected && colorIsValid && depositIsValid) {
      setModalState(current => ({ ...current, type: ModalTypes.Loading }))
      signingCosmWasmClient.client?.signAndBroadcast(
        chainContext.address ?? '',
        [
          createPaintMessage(
            chainContext.address ?? '',
            config.contracts.paint,
            { paint: { color: input.color, position: data.position.toString() } },
            [{ denom: 'uwhale', amount: (Number(input.deposit) * DECIMALS).toString() }]
          )
        ],
        {
          amount: [{
            denom: 'uwhale',
            amount: '1'
          }],
          gas: '500000'
        }
      ).then(({ code, transactionHash: hash, height }) => { setModalState({ type: ModalTypes.Transaction, data: { code, height, hash } }) }
      ).catch(() => setModalState({ data: {}, type: ModalTypes.RequestRejected })
      ).finally()
    }
  }

  const PositionX = Math.floor(data.position / Math.sqrt(Number(config.canvas.size)))
  const PositionY = data.position % Math.sqrt(Number(config.canvas.size))
  const colorIsValid = isHexColor(input.color)
  const depositIsValid = Number(input.deposit) > data.deposit / DECIMALS
  return (
    <Card className='w-96'>
      <CardHeading>Tile {`(${PositionX}, ${PositionY})`}</CardHeading>
      <CardBody>
        <CardContent className='w-full flex flex-row items-center justify-between'>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Painter</Text>
            <Link target="_blank" href={exploreAccount(data.painter)} rel="noreferrer">
              {formatAddress(data.painter)}
            </Link>
          </Box>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Color</Text>
            <Text>{data.color}</Text>
          </Box>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Deposit</Text>
            <Text>{formatBalance(data.deposit)}</Text>
          </Box>
        </CardContent>
      </CardBody>

      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-m font-medium py-1">
            Color
          </p>
          <p className="text-m font-medium py-1">
            Deposit
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className={`bg-neutral-900 border border-solid text-neutral-300 rounded-md py-1 px-2 outline-none border-opacity-40 ${colorIsValid ? 'border-green-500' : 'border-red-500'}`}
            value={input.color}
            onChange={(e) => { setInput(current => ({ ...current, color: e.target.value })) }}
            onFocus={(e) => { e.target.select() }}
          />
          <input
            type="text"
            className={`bg-neutral-900 border border-solid text-neutral-300 rounded-md py-1 px-2 outline-none border-opacity-40 ${depositIsValid ? 'border-green-500' : 'border-red-500'}`}
            value={input.deposit}
            onChange={(e) => { setInput(current => ({ ...current, deposit: e.target.value })) }}
            onFocus={(e) => { e.target.select() }}
          />
        </div>
      </div>
      <Container className='flex justify-center items-center'>
        <div
          className='w-8 h-8 border border-solid border-neutral-600'
          style={{ backgroundColor: input.color }}
        >
        </div>
      </Container>
      <Button variant="primary" onClick={onClick}>
        {chainContext.isWalletConnected ? 'Paint' : 'Connect Wallet'}
      </Button>
    </Card>
  )
}
