"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useWindowDimensions } from "./window";
import classNames from "classnames";
import NoSSR from "./NoSSR";

interface Tile {
  x: number;
  y: number;
  color: string;
  startingPiece: string;
}

const board: Array<Tile> = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    board.push({
      x: row,
      y: col,
      color: (row + col) % 2 === 0 ? "green" : "white",
      startingPiece: row == 1 ? "Black-Pawn" : "White-Pawn",
    });
  }
}

function Piece({ src }: { src: string }) {
  const pieceRef = useRef<any>(null);
  return (
    <div
      draggable
      ref={pieceRef}
      onDragStart={() => {
        console.log("dragging");
        pieceRef.current.classList.add("dragging");
      }}
      onDragEnd={(e) => {
        console.log("dropped");
        const currentDiv = document.elementFromPoint(e.clientX, e.clientY);
        console.log(currentDiv);
        currentDiv?.appendChild(document.querySelector(".dragging")!);
        pieceRef.current.classList.remove("dragging");
      }}
      className="absolute z-10 w-1/12 h-1/12"
    >
      <Image src={src} alt="Black_Bishop" width={720} height={720} />
    </div>
  );
}

export default function Board() {
  const { height, width } = useWindowDimensions();

  const boardClass = classNames(
    "grid grid-cols-8 aspect-square border-[.5em] border-black border-solid absolute",
    {
      "h-3/4": width > height,
      "w-3/4": width < height,
    },
  );

  return (
    <NoSSR>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className={boardClass}>
          {board?.map((tile) => (
            <div
              onDragOver={(e) => {
                e.preventDefault();
              }}
              key={`${tile.x}-${tile.y}`}
              style={{
                backgroundColor: `${tile.color}`,
                width: `100%`,
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {tile.startingPiece == "Black-Pawn" ? (
                <Piece src="/Black-Pawn.png" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </NoSSR>
  );
}
