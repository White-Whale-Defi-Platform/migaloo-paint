'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { canvasAtom, modalAtom } from '@/state'
import { ModalTypes, type TileModalData } from '@/types'
import { ZERO } from '@/constants'

const Tile: React.FC<{ painter: string, deposit: number, color: string, position: number }> = (props: { painter: string, deposit: number, color: string, position: number }): JSX.Element => {
  const setModalState = useSetRecoilState(modalAtom)

  return (
    <div
      style={{ backgroundColor: props.color }}
      className="cursor-pointer hover:animate-ping"
      onClick={() => { setModalState({ data: (props as TileModalData), type: ModalTypes.Tile }) }}
    />
  )
}

const Canvas = (): JSX.Element => {
  const { tiles } = useRecoilValue(canvasAtom)
  const gridSize = Math.sqrt(tiles.length)

  return (
    <div className="w-[80vh] h-full grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {gridSize === ZERO
        ? <div className="flex items-center justify-center h-full">
          <div className="animate-spin 2s rounded-full h-64 w-64 border-b-8 border-green-600">
          </div>
        </div>
        : tiles.map((tile, index) => {
          const x = Math.floor(index / gridSize)
          const y = index % gridSize
          return (
            <Tile
              key={`tile:(${x}, ${y})`}
              position={index}
              {...tile}
            />
          )
        })}
    </div>
  )
}

export default Canvas
