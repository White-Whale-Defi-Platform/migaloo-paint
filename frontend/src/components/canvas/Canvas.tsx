'use client'

import { useRecoilValue } from 'recoil';
import { canvasAtom } from '@/state'
import Tile from './Tile'

const Canvas = () => {
  const { canvas, loading, error } = useRecoilValue(canvasAtom);
  return (
    <>
      <div className="w-[80vh] h-full grid" style={{ gridTemplateColumns: `repeat(${Math.sqrt(canvas.length)}, 1fr)` }}>
        {canvas.length === 0 ?
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin 2s rounded-full h-64 w-64 border-b-8 border-green-600">
            </div>
          </div>
          :
          canvas.map((tile, index) => {
            const x = Math.floor(index / Math.sqrt(canvas.length));
            const y = index % Math.sqrt(canvas.length);
            return (
              <Tile
                key={`tile:(${x}, ${y})`}
                data={{ position: index, ...tile }}
              />
            );
          })}
      </div>
    </>
  );
};

export default Canvas
