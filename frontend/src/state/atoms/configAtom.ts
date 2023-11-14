import { atom } from 'recoil';

export type ConfigState = {
  config: {
    contracts: {
      paint: string,
      furnace: string,
    },
    canvas: {
      size: string,
      color: string,
      denom: string,
      deposit: string,
    }
  },
  loading: boolean,
  error: unknown

}
const configAtom = atom<ConfigState>(
  {
    key: 'configAtom',
    default: {
      config: {
        contracts: {
          paint: "migaloo150alghj63l2p2wscymh3xr053eu9d95vs0s8zjtru89enjscn32s7yytx7",
          furnace: ""
        },
        canvas: {
          size: "",
          color: "",
          denom: "",
          deposit: ""
        }
      },
      loading: true,
      error: null
    }
  }
)

export default configAtom
