import React from "react";
import { useDrop } from "react-dnd";
import Letter from "./Letter";
import "./Box.css";

const ItemTypes = {
  LETTER: "LETTER",
};

function Box({ index, letter, onDrop, onRemove, wordId }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.LETTER,
      drop: (item) => {
        if (item.wordId === wordId) {
          onDrop(item, index);
        }
      },
      canDrop: (item) => item.wordId === wordId,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [letter, wordId, index]
  );

  const handleClick = () => {
    if (letter) {
      onRemove(index);
    }
  };

  const backgroundColor = isOver
    ? canDrop
      ? "lightgreen"
      : "lightcoral"
    : "white";

  return (
    <div
      ref={drop}
      className="box"
      style={{ backgroundColor }}
      onClick={handleClick}
    >
      {letter && (
        <Letter
          letter={letter}
          wordId={wordId}
          origin="box"
          index={index}
        />
      )}
    </div>
  );
}

export default Box;
