// src/gameLogic.js
import geminiLLM from "./llm";

export async function startGame(theme) {
  if (!theme) {
    throw new Error("Please provide a theme to start the game.");
  }

  try {
    const jsonResponse = await geminiLLM.generateWordsFromTheme(theme);
    console.log("The JSON response is: ", jsonResponse);

    let wordsArray;

    // Handle response formats dynamically
    if (Array.isArray(jsonResponse)) {
      wordsArray = jsonResponse; // Flat array response
    } else if (jsonResponse.words && Array.isArray(jsonResponse.words)) {
      wordsArray = jsonResponse.words; // Object with 'words' property
    } else {
      throw new Error(
        "Invalid data format: Expected an array or an object with a 'words' array."
      );
    }

    // Ensure we have exactly 10 words
    if (wordsArray.length !== 10) {
      throw new Error("Received an incorrect number of words from the API.");
    }

    return wordsArray;
  } catch (error) {
    console.error("Failed to start the game:", error);
    throw new Error("Game initialization failed. Could not generate words.");
  }
}

// Function to find bonus words within the solved words
export function findBonusWords(solvedWords) {
  const bonuses = new Set();

  solvedWords.forEach((word) => {
    const upperWord = word.toUpperCase();
    const wordLength = upperWord.length;

    // Iterate through all possible substrings of length 3 or more
    for (let i = 0; i < wordLength; i++) {
      for (let j = i + 3; j <= wordLength; j++) {
        const subWord = upperWord.substring(i, j);
        if (subWord !== upperWord) { // Exclude the main word itself
          bonuses.add(subWord);
        }
      }
    }
  });

  return Array.from(bonuses);
}
