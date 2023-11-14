import { useState, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { fetchCanvas, FetchCanvasResponse } from '@/lib';
import { configAtom } from '@/state';
import { Tile } from '@/types/Canvas';

const useFetchCanvas = (client: CosmWasmClient | null, contract: string) => {
  const [canvas, setCanvasData] = useState<FetchCanvasResponse>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const config = useRecoilValue(configAtom);
  const limit = 20000;

  const fetchAllCanvasData = async () => {
    try {
      if (!client || !config) return;
      setLoading(true);

      let startAfter = 0;
      let allCanvasData: Tile[] = [];
      let allTilesFetched = false;

      while (!allTilesFetched) {
        const response = await fetchCanvas(client, contract, startAfter.toString(), limit.toString());
        if (!response || !response.canvas) {
          throw new Error('Invalid response for canvas data');
        }

        allCanvasData = [...allCanvasData, ...response.canvas];

        if (response.canvas.length < limit || startAfter + limit >= Number(config.config.canvas.size)) {
          allTilesFetched = true;
        } else {
          startAfter += limit;
        }
      }
      if (allCanvasData.length == Number(config.config?.canvas.size)) {
        setCanvasData({ canvas: allCanvasData });
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCanvasData();

    const interval = setInterval(fetchAllCanvasData, 20000);

    return () => clearInterval(interval);
  }, [client, contract, config]);

  return useMemo(() => ({ canvas: canvas?.canvas, loading, error }), [canvas, loading, error]);
};

export default useFetchCanvas;
