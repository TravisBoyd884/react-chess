import React, { useRef } from "react";
import Image from "next/image";

export default function Piece({ src }: { src: string }) {
  const pieceRef = useRef<any>(null);
  const handleDrop = (e: any) => {
    const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

    // hoveredElement?
    const hasChildren = hoveredElement?.hasChildNodes(),
      isPiece = hoveredElement?.classList.contains("piece"),
      isTile = hoveredElement?.classList.contains("tile"),
      isEmptyTile = !hasChildren && !isPiece && isTile,
      isDraggedElement = hoveredElement?.classList?.contains("dragging"),
      isTileContainingDraggedElement =
        hoveredElement?.children[0]?.classList?.contains("dragging");

    // If it's over an empty tile, append the piece to the tile
    if (isEmptyTile) {
      hoveredElement?.appendChild(document.querySelector(".dragging")!);
    }
    // If it's over a different tile, append the piece to the tile and remove its children if it has any
    else if (isTile && hasChildren && !isTileContainingDraggedElement) {
      hoveredElement!.innerHTML = "";
      hoveredElement?.appendChild(document.querySelector(".dragging")!);
    }
    // If it's over another piece, remove the piece from the tile and append the piece to the tile
    else if (isPiece && !isDraggedElement) {
      const tile = hoveredElement?.parentElement;
      tile!.innerHTML = "";
      tile?.appendChild(document.querySelector(".dragging")!);
    }
    pieceRef.current.classList.remove("dragging");
  };
  return (
    <Image
      draggable
      ref={pieceRef}
      onTouchStart={() => {
        pieceRef.current.classList.add("dragging");
      }}
      onDragStart={() => {
        pieceRef.current.classList.add("dragging");
      }}
      onDragEnd={handleDrop}
      onTouchEnd={handleDrop}
      className="w-1/2 h-1/2 piece"
      src={src}
      alt={src}
      width={720}
      height={720}
    />
  );
}
