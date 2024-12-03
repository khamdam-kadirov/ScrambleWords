// src/App.js
import React, { useState, useEffect } from "react";
import WordRow from "./WordRow";
import "./App.css";
import { startGame, findBonusWords } from "./gameLogic";
import MatrixBackground from "./components/MatrixBackground"; // Importing the Matrix background
import Popup from "./components/Popup"; // Importing the Popup component

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function App() {
  const [theme, setTheme] = useState(""); // Store the user's theme input
  const [wordsData, setWordsData] = useState([]); // Store the data for each word
  const [loading, setLoading] = useState(false); // Loading state indicator
  const [error, setError] = useState(null); // Error handler
  const [showPopup, setShowPopup] = useState(false); // Popup visibility
  const [totalErrors, setTotalErrors] = useState(0); // Total number of errors
  const [bonusWords, setBonusWords] = useState([]); // List of bonus words

  const handleThemeChange = (event) => {
    setTheme(event.target.value); // Update theme as user types
  };

  // Function to handle submitting the theme and starting the game
  const handleSubmit = async () => {
    if (!theme) {
      alert("Please enter a theme to generate words.");
      return;
    }

    setLoading(true);
    setError(null);
    setShowPopup(false);
    setTotalErrors(0);
    setBonusWords([]);

    try {
      const generatedWords = await startGame(theme);

      if (!Array.isArray(generatedWords)) {
        throw new Error("Failed to generate words. Please try again.");
      }

      const newWordsData = generatedWords.map((word) => {
        // Remove spaces from the word when generating letters
        const cleanWord = word.toUpperCase().replace(/\s+/g, '');
        const letters = shuffleArray(cleanWord.split(""));
        const userAnswer = Array(cleanWord.length).fill(null);
        return {
          word: word.toUpperCase(), // Keep the original word (with spaces)
          letters,
          userAnswer,
          result: false, // Initially not solved
          errors: 0, // Track errors for each word
        };
      });

      setWordsData(newWordsData);
      console.log("Updated wordsData:", newWordsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle word completion
  const handleWordComplete = (wordId, errors) => {
    setWordsData((prevWordsData) =>
      prevWordsData.map((wordData, index) =>
        index === wordId
          ? { ...wordData, result: true, errors: wordData.errors + errors }
          : wordData
      )
    );
    setTotalErrors((prevErrors) => prevErrors + errors);
    console.log(`Word ${wordId} completed with ${errors} errors.`);
  };

  // Check if all words are completed
  useEffect(() => {
    if (wordsData.length > 0 && wordsData.every((word) => word.result)) {
      // Find bonus words
      const allSolvedWords = wordsData.map((word) => word.word);
      const bonuses = findBonusWords(allSolvedWords);
      setBonusWords(bonuses);
      setShowPopup(true);
    }
  }, [wordsData]);

  // Function to start over the game
  const handleStartOver = () => {
    setTheme("");
    setWordsData([]);
    setShowPopup(false);
    setTotalErrors(0);
    setBonusWords([]);
  };

  return (
    <div className="App">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Main Content Wrapper */}
      <div className="content-wrapper">
        <header>
          <h1>Word Scramble Game</h1>
        </header>

        <main className="container">
          <p className="green-bold-text">Enter a theme to generate words:</p>
          <div className="searchbox-container">
            <input
              type="text"
              value={theme}
              onChange={handleThemeChange}
              placeholder="Enter a theme (e.g., Animals, Food)"
            />
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : "Generate Words"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {/* Render the WordRow components */}
          {wordsData.map((wordData, index) => (
            <WordRow
              key={index}
              wordData={wordData}
              wordId={index}
              onComplete={handleWordComplete}
            />
          ))}
        </main>

        <footer>
          <p>
            &copy; 2024 Scramble Games. CSC372 Final Project. <br />
            <a
              href="https://github.com/khamdam-kadirov/ScrambleWords"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github Repo
            </a>
          </p>
        </footer>
      </div>

      {/* Popup for Win Condition */}
      {showPopup && (
        <Popup
          totalErrors={totalErrors}
          bonusWords={bonusWords}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;
