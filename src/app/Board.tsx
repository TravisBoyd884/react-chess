"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "./window";

interface Tile {
  x: number;
  y: number;
  color: string;
}

const board: Array<Tile> = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    board.push({
      x: row,
      y: col,
      color: (row + col) % 2 === 0 ? "black" : "white",
    });
  }
}

export default function Board() {
  const { height, width } = useWindowDimensions();

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div
          className={`grid grid-cols-8 ${width > height ? "h-3/4" : "w-3/4"} aspect-square border-[.5em] border-black border-solid`}
        >
          {board?.map((tile) => (
            <span
              key={`${tile.x}-${tile.y}`}
              style={{
                backgroundColor: `${tile.color}`,
                width: `100%`,
                height: "100%",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
