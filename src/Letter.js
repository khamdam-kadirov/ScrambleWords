// Letter.js
import React from "react";
import { useDrag } from "react-dnd";
import "./Letter.css";

const ItemTypes = {
  LETTER: "LETTER",
};

// Letter.js
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

  return (
    <div
      ref={drag}
      className="letter"
      style={{ opacity: isDragging ? 0.5 : 1 }}>
      {letter.letter} {/* If using objects with IDs */}
    </div>
  );
}

export default Letter;
