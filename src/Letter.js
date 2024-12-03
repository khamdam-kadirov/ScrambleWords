// src/components/Letter.js
import React from "react";
import { useDrag } from "react-dnd";
import "./Letter.css";

const ItemTypes = {
  LETTER: "LETTER",
};

function Letter({ letter, wordId, origin, index }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.LETTER,
      item: { letter, wordId, origin, index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [letter, wordId, origin, index]
  );

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      className="letter"
      ref={drag}
      style={{ opacity }}
    >
      {letter}
    </div>
  );
}

export default Letter;
