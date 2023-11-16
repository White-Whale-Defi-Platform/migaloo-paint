import type { PaintMsg } from '@/types/msgs'
import { toUtf8 } from '@cosmjs/encoding'
import type { Coin } from '@cosmjs/stargate'
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'
import type { EncodeObject } from '@cosmjs/proto-signing'

export const createMsgExecuteContract = (senderAddress: string, contractAddress: string, message: string, funds: Coin[]): EncodeObject => (
  {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial(
      {
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(message),
        funds: [...funds]
      }
    )
  }
)

export const createPaintMessage = (senderAddress: string, contractAddress: string, paintMsg: PaintMsg, funds: Coin[]): EncodeObject => createMsgExecuteContract(senderAddress, contractAddress, JSON.stringify(paintMsg), funds)
