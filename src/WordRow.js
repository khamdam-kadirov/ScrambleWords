// WordRow.js
import React, { useState } from "react";
import Word from "./Word";
import "./WordRow.css";

function WordRow({ wordData, index }) {
  const [letters, setLetters] = useState(
    wordData.letters.map((letter, idx) => ({ id: idx, letter }))
  );
  const [userAnswer, setUserAnswer] = useState(wordData.userAnswer);
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    const answer = userAnswer.join("");
    if (answer.toUpperCase() === wordData.word.toUpperCase()) {
      setResult("Correct!");
    } else {
      setResult("Incorrect. Try again!");
    }
  };

  const handleReset = () => {
    const newLetters = shuffleArray(
      wordData.word
        .toUpperCase()
        .split("")
        .map((letter, idx) => ({ id: idx, letter }))
    );
    setLetters(newLetters);
    setUserAnswer(Array(wordData.word.length).fill(null));
    setResult(null);
  };

  function shuffleArray(array) {
    return array
      .map((value) => ({ ...value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ id, letter }) => ({ id, letter }));
  }

  return (
    <div className="word-row">
      <div className="word-row-content">
        <Word
          letters={letters}
          setLetters={setLetters}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          wordId={index}
        />
        <div className="buttons">
          <button onClick={handleCheck}>Check Answer</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        {result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default WordRow;
