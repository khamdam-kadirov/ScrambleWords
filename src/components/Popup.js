// src/components/Popup.js
import React from "react";
import "./Popup.css";

function Popup({ totalErrors, bonusWords, onStartOver }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Congratulations!</h2>
        <p>You have successfully solved all the words.</p>
        <p>Total Errors: {totalErrors}</p>
        {bonusWords.length > 0 && (
          <>
            <h3>Bonus Words:</h3>
            <ul>
              {bonusWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </>
        )}
        <button onClick={onStartOver}>Start Over</button>
      </div>
    </div>
  );
}

export default Popup;
