"use client";
import React, { useState, useRef, useEffect } from "react";

export default function MyComponent() {
  const [isDragging, setIsDragging] = useState(false);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const spanRef = useRef<any>(null);

  const handleDragStart = (event) => {
    const rect = spanRef?.current?.getBoundingClientRect();
    setInitialPos({ x: rect.left, y: rect.top });
    setIsDragging(true);
  };

  const handleDrag = (event: any) => {
    if (!isDragging) return;

    setCurrentPos({
      x: event.clientX - initialPos.x,
      y: event.clientY - initialPos.y,
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const span = spanRef.current;
    if (span) {
      span.addEventListener("mousemove", handleDrag);
      span.addEventListener("mouseup", handleDragEnd);

      return () => {
        span.removeEventListener("mousemove", handleDrag);
        span.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [isDragging, currentPos]);

  return (
    <div>
      <span
        ref={spanRef}
        draggable="true"
        onDragStart={handleDragStart}
        style={{
          position: "absolute",
          left: currentPos.x,
          top: currentPos.y,
        }}
      >
        Drag Me
      </span>
    </div>
  );
}
