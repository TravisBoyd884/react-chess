"use client";
import Piece from "./Piece";
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
      color: (row + col) % 2 === 0 ? "#bda27e" : "#e4d2ba",
      startingPiece: row == 1 ? "Black-Pawn" : "White-Pawn",
    });
  }
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
                console.log("dragging over");
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
              className="tile"
            >
              {tile.startingPiece == "Black-Pawn" ? (
                <Piece src="/Black-Pawn.png" />
              ) : (
                <Piece src="/White-Pawn.png" />
              )}
            </div>
          ))}
        </div>
      </div>
    </NoSSR>
  );
}
