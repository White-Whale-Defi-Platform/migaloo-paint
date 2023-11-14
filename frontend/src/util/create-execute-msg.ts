import { Msg } from '@/types/Msgs';
import { toUtf8 } from '@cosmjs/encoding'
import { Coin } from '@cosmjs/stargate';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx'

export const createExecuteMessage = (senderAddress: string, contractAddress: string, message: Msg, funds: Coin[] | null) => (
  {
    typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: MsgExecuteContract.fromPartial(
      {
        sender: senderAddress,
        contract: contractAddress,
        msg: toUtf8(JSON.stringify(message)),
        funds: funds ?? [],
      }
    )
  }
)
