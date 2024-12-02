// Word.js
import React from "react";
import Letter from "./Letter";
import "./Word.css";

function Word({ letters, setLetters, userAnswer, setUserAnswer, wordId }) {
  const handleLetterClick = (letter) => {
    // Remove letter from letters pool
    const newLetters = letters.filter((l) => l.id !== letter.id);
    setLetters(newLetters);

    // Add letter to the next available spot in userAnswer
    const newUserAnswer = [...userAnswer];
    const emptyIndex = newUserAnswer.findIndex((l) => l === null);
    if (emptyIndex !== -1) {
      newUserAnswer[emptyIndex] = letter;
      setUserAnswer(newUserAnswer);
    } else {
      // If no empty spots, put the letter back
      setLetters([...newLetters, letter]);
      alert("All boxes are filled. Click on a letter in the answer to remove it.");
    }
  };

  const handleAnswerLetterClick = (index) => {
    const letter = userAnswer[index];
    if (letter) {
      // Remove letter from userAnswer
      const newUserAnswer = [...userAnswer];
      newUserAnswer[index] = null;
      setUserAnswer(newUserAnswer);

      // Add letter back to letters pool
      setLetters([...letters, letter]);
    }
  };

  return (
    <div className="word-container">
      <div className="letters">
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            onClick={() => handleLetterClick(letter)}
          />
        ))}
      </div>
      <div className="boxes">
        {userAnswer.map((letter, idx) => (
          <div
            key={idx}
            className="box"
            onClick={() => handleAnswerLetterClick(idx)}
          >
            {letter && <Letter letter={letter} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Word;
