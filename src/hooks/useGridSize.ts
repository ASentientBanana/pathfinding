import React, { useEffect, useRef } from "react";
import { DEFAULT_TILE_SIZE, usePathfinderStore } from "../store";
import { generateGrid } from "../util/Utility";

const useGridSize = () => {
  const store = usePathfinderStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const getGridSize = () => {
    if (!containerRef.current) return;
    const gridSize = containerRef.current.clientWidth;

    store.setGridSize(
      Math.floor(gridSize / store.tileSize) * store.tileSize,
      gridSize < 800 ? 400 : 600
    );
  };

  useEffect(() => {
    getGridSize();

    return window.addEventListener("resize", () => {
      getGridSize();
    });
  }, []);

  return {
    containerRef,
  };
};
export default useGridSize;
