// WordRow.js
import React, { useState, useEffect } from "react";
import Word from "./Word";
import "./WordRow.css";

function WordRow({ wordData }) {
  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const createLetterObjects = (word) => {
    return word.toUpperCase().split("").map((letter, idx) => ({
      id: `${word}-${idx}`,
      letter,
    }));
  };

  const [letters, setLetters] = useState(() =>
    shuffleArray(createLetterObjects(wordData.word.replace(/\s+/g, "")))
  );
  const [userAnswer, setUserAnswer] = useState(() =>
    Array(wordData.word.replace(/\s+/g, "").length).fill(null)
  );
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    const answer = userAnswer.map((l) => (l ? l.letter : "")).join("");
    const cleanWord = wordData.word.replace(/\s+/g, "").toUpperCase();

    if (answer.toUpperCase() === cleanWord) {
      setResult("Correct!");
    } else {
      setResult("Incorrect. Try again!");
    }
  };

  const handleReset = () => {
    setLetters(shuffleArray(createLetterObjects(wordData.word.replace(/\s+/g, ""))));
    setUserAnswer(Array(wordData.word.replace(/\s+/g, "").length).fill(null));
    setResult(null);
  };

  return (
    <div className="word-row">
      <div className="word-row-content">
        <Word
          letters={letters}
          setLetters={setLetters}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          wordId={wordData.word}
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
