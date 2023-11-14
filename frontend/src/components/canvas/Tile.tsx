'use client'
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/state";
import { Modals } from "@/types/Modals";

const Tile: React.FC<{ data: any }> = ({ data }) => {
  const setModalState = useSetRecoilState(modalAtom)

  return (
    <div
      style={{ backgroundColor: data.color }}
      className="cursor-pointer hover:animate-ping"
      onClick={() => setModalState({ data, type: Modals.Tile })}
    />
  )
};

export default Tile
