// Letter.js
import React from "react";
import "./Letter.css";

function Letter({ letter, onClick }) {
  return (
    <div className="letter" onClick={onClick}>
      {letter.letter}
    </div>
  );
}

export default Letter;
