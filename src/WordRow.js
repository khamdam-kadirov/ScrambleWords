// src/WordRow.js
import React, { useState } from "react";
import "./WordRow.css"; // Ensure this CSS file exists and is correctly imported

function WordRow({ wordData, wordId, onComplete }) {
  const [userAnswer, setUserAnswer] = useState([]);
  const [errors, setErrors] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [message, setMessage] = useState("");

  // Initialize letters with unique IDs to handle duplicate letters
  const lettersWithId = wordData.letters.map((letter, index) => ({
    letter,
    id: index,
  }));

  const [availableLetters, setAvailableLetters] = useState(lettersWithId);

  // Handle clicking on an available letter
  const handleLetterClick = (letterObj) => {
    if (isSolved || userAnswer.length >= wordData.word.length) return;

    setUserAnswer([...userAnswer, letterObj]);
    setAvailableLetters(
      availableLetters.filter((letter) => letter.id !== letterObj.id)
    );
  };

  // Handle clicking on a letter in the user answer to remove it
  const handleAnswerClick = (index) => {
    if (isSolved) return;

    const letterToRemove = userAnswer[index];
    const newUserAnswer = userAnswer.filter((_, i) => i !== index);
    setUserAnswer(newUserAnswer);
    setAvailableLetters([...availableLetters, letterToRemove]);
  };

  // Handle checking the answer
  const checkAnswer = () => {
    const assembledWord = userAnswer.map((obj) => obj.letter).join("").toUpperCase();
    if (assembledWord === wordData.word) {
      setIsSolved(true);
      setMessage("✅ Correct!");
      onComplete(wordId, errors);
    } else {
      setErrors(errors + 1);
      setMessage("❌ Incorrect, try again!");
    }
  };

  // Handle starting over for this word
  const startOver = () => {
    setUserAnswer([]);
    setErrors(0);
    setIsSolved(false);
    setMessage("");
    setAvailableLetters(lettersWithId);
  };

  return (
    <div className={`word-row ${isSolved ? "solved" : ""}`}>
      <div className="word-title">
        {/* Optionally display the word's hint or category */}
        {/* <span>{wordData.hint}</span> */}
      </div>
      <div className="available-letters">
        {availableLetters.map((letterObj) => (
          <button
            key={letterObj.id}
            className="letter-button"
            onClick={() => handleLetterClick(letterObj)}
            disabled={isSolved || userAnswer.length >= wordData.word.length}
          >
            {letterObj.letter}
          </button>
        ))}
      </div>
      <div className="user-answer">
        {Array.from({ length: wordData.word.length }).map((_, index) => (
          <div
            key={index}
            className={`answer-box ${userAnswer[index] ? "filled" : ""}`}
            onClick={() => handleAnswerClick(index)}
          >
            {userAnswer[index] ? userAnswer[index].letter : ""}
          </div>
        ))}
      </div>
      <div className="controls">
        {!isSolved && (
          <button
            onClick={checkAnswer}
            disabled={userAnswer.length !== wordData.word.length}
            className="check-button"
          >
            Check Answer
          </button>
        )}
        {isSolved && (
          <button onClick={startOver} className="start-over-button">
            Start Over
          </button>
        )}
      </div>
      {message && (
        <p className={`message ${isSolved ? "success" : "error"}`}>
          {message}
        </p>
      )}
      {isSolved && (
        <div className="correct-answer">
          <strong>Correct Answer:</strong> {wordData.word}
        </div>
      )}
    </div>
  );
}

export default WordRow;
