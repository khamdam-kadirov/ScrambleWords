// App.js
import React, { useState } from "react";
import WordRow from "./WordRow";
import "./App.css";
import { startGame } from "./gameLogic";

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

    try {
      const generatedWords = await startGame(theme);
      const selectedWords = generatedWords;
      const newWordsData = selectedWords.map((word) => {
        const letters = shuffleArray(word.toUpperCase().split(""));
        const userAnswer = Array(word.length).fill(null);
        return {
          word: word.toUpperCase(),
          letters,
          userAnswer,
          result: null,
        };
      });
      setWordsData(newWordsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Word Scramble Game</h1>
      </header>

      <div className="container">
        <p>Enter a theme to generate words:</p>
        <div className="searchbox-container">
          <input
            type="text"
            value={theme}
            onChange={handleThemeChange}
            placeholder="Enter a theme (e.g., Animals, Food)"
          />
          <button onClick={handleSubmit}>
            {loading ? "Loading..." : "Generate Words"}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Render the WordRow components */}
        {wordsData.map((wordData, index) => (
          <WordRow key={index} wordData={wordData} index={index} />
        ))}
      </div>

      <footer>
        <p>
          &copy; 2024 Scramble Games. CSC372 Final Project. <br />
          <a href="https://github.com/nurkhat18/CS372/tree/main/noname">
            Github Repo
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
