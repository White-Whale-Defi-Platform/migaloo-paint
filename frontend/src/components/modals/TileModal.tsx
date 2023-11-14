'use client'

import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useChainContext, useSigningCosmWasmClient } from '@/hooks';
import { createExecuteMessage, formatAddress, formatBalance, isHexColor } from '@/util';
import { configAtom, modalAtom } from '@/state';
import { Modals } from '@/types/Modals';
import Box from '../common/Box';
import { Button, Card, CardBody, CardHeading, Text } from '../common';
import CardContent from '../common/card/CardContent';


const TileModal = () => {
  const [modalState, setModalState] = useRecoilState(modalAtom)
  const chainContext = useChainContext()
  const config = useRecoilValue(configAtom)
  const signingCosmWasmClient = useSigningCosmWasmClient()


  const [input, setInput] = React.useState({ color: modalState.data.color, deposit: (Number(modalState.data.deposit) / 1_000_000).toString() });

  useEffect(() => setInput({ color: modalState.data.color, deposit: (Number(modalState.data.deposit) / 1_000_000).toString() }), [modalState.data])

  const onClick = () => {
    if (chainContext.isWalletConnected && colorIsValid && depositIsValid) {
      setModalState(current => ({ ...current, type: Modals.Loading }))
      signingCosmWasmClient.signingCosmWasmClient?.signAndBroadcast(
        chainContext.address ?? "",
        [createExecuteMessage(
          chainContext.address ?? "",
          config.config.contracts.paint,
          { paint: { color: input.color, position: modalState.data.position.toString() } },
          [{ denom: "uwhale", amount: (Number(input.deposit) * 1_000_000).toString() }],
        )],
        {
          amount: [{
            denom: "uwhale",
            amount: "1"
          }],
          gas: "2000000",
        },
      ).then(data => setModalState({ type: Modals.Transaction, data })
      ).catch(
        (e) => console.log("error", e) // TODO show other modal
      ).finally()
    } else {
      setModalState(current => ({ ...current, type: Modals.None }))
    }
  }

  const tile_position_x = Math.floor(modalState.data.position / Math.sqrt(Number(config.config.canvas.size)))
  const tile_position_y = modalState.data.position % Math.sqrt(Number(config.config.canvas.size))
  const colorIsValid = isHexColor(input.color)
  const depositIsValid = Number(input.deposit) > modalState.data.deposit / 1_000_000
  return (
    <Card className='w-96'>
      <CardHeading>Tile {`(${tile_position_x}, ${tile_position_y})`}</CardHeading>
      <CardBody>
        <CardContent className='w-full flex flex-row items-center justify-between'>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Painter</Text>
            <a target="_blank" href={`https://ping.pub/migaloo/account/${modalState.data.painter}`}>
              {formatAddress(modalState.data.painter)}
            </a>
          </Box>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Color</Text>
            <Text>{modalState.data.color}</Text>
          </Box>
          <Box className="flex-grow flex flex-col items-center justify-center gap-2">
            <Text>Deposit</Text>
            <Text>{formatBalance(modalState.data.deposit)}</Text>
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
            className={`bg-neutral-900 border border-solid text-neutral-300 rounded-md py-1 px-2 outline-none ${colorIsValid ? "border-green-500" : "border-red-500"}`}
            value={input.color}
            onChange={(e) => setInput(current => ({ ...current, color: e.target.value }))}
            onFocus={(e) => e.target.select()}
          />
          <input
            type="text"
            className={`bg-neutral-900 border border-solid text-neutral-300 rounded-md py-1 px-2 outline-none ${depositIsValid ? "border-green-500" : "border-red-500"}`}
            value={input.deposit}
            onChange={(e) => setInput(current => ({ ...current, deposit: e.target.value }))}
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>

      <Button variant="primary" onClick={onClick}>
        {chainContext.isWalletConnected ? "Paint" : "Connect Wallet"}
      </Button>
    </Card>
  )
}

export default TileModal
