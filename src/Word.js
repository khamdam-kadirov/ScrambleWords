// Word.js
import React from "react";
import Letter from "./Letter";
import Box from "./Box";
import "./Word.css";

function Word({ letters, setLetters, userAnswer, setUserAnswer, wordId }) {
  const handleDrop = (item, index) => {
    if (item.origin === "pool") {
      // Remove letter from letters pool based on its value
      const newLetters = [...letters];
      const letterIndex = newLetters.findIndex((l) => l === item.letter);
      if (letterIndex !== -1) {
        newLetters.splice(letterIndex, 1);
        setLetters(newLetters);
      }

      // Add letter to userAnswer
      const newUserAnswer = [...userAnswer];
      newUserAnswer[index] = item.letter;
      setUserAnswer(newUserAnswer);
    } else if (item.origin === "box") {
      // Swap letters between boxes
      const newUserAnswer = [...userAnswer];
      const temp = newUserAnswer[index];
      newUserAnswer[index] = item.letter;
      newUserAnswer[item.index] = temp;
      setUserAnswer(newUserAnswer);
    }
  };

  const handleRemove = (index) => {
    const letter = userAnswer[index];
    if (letter) {
      // Remove letter from userAnswer
      const newUserAnswer = [...userAnswer];
      newUserAnswer[index] = null;
      setUserAnswer(newUserAnswer);

      // Add letter back to letters
      setLetters([...letters, letter]);
    }
  };

  return (
    <div className="word-container">
      <div className="letters">
        {letters.map((letter, idx) => (
          <Letter
            key={idx}
            letter={letter}
            wordId={wordId}
            origin="pool"
            index={idx}
          />
        ))}
      </div>
      <div className="boxes">
        {userAnswer.map((letter, idx) => (
          <Box
            key={idx}
            index={idx}
            letter={letter}
            onDrop={handleDrop}
            onRemove={handleRemove}
            wordId={wordId}
          />
        ))}
      </div>
    </div>
  );
}

export default Word;
