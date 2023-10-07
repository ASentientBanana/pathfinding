import React, { useEffect, useRef } from "react";
import { DEFAULT_TILE_SIZE, usePathfinderStore } from "../store";
import { generateGrid } from "../util/Utility";

const useGridSize = () => {
  const store = usePathfinderStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const getGridSize = () => {
    if (!containerRef.current) return;
    const gridSize = containerRef.current.clientWidth - 100;

    if (
      window.innerWidth <= 800 &&
      window.innerWidth > 600 &&
      store.gridSize !== 600
    ) {
      store.setGridSize(600);
    } else if (
      window.innerWidth <= 600 &&
      window.innerWidth > 400 &&
      store.gridSize !== 400
    ) {
      store.setGridSize(400);
    } else if (window.innerWidth <= 400 && store.gridSize !== 300) {
      store.setGridSize(300);
      store.setTileSize(20);
    } else if (window.innerWidth > 800) {
      store.setGridSize(800);
    }
    if (window.innerWidth > 400 && store.tileSize === DEFAULT_TILE_SIZE) {
      store.setTileSize(40);
    }
  };

  useEffect(() => {
    getGridSize();

    return window.addEventListener("resize", () => {
      console.log("resize");
      getGridSize();
    });
  }, []);

  return {
    containerRef,
  };
};
export default useGridSize;
