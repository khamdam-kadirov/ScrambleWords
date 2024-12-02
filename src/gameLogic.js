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
      throw new Error("Invalid data format: Expected an array or an object with a 'words' array.");
    }

    // Optionally, ensure we have exactly 10 words
    if (wordsArray.length !== 10) {
      throw new Error("Received an incorrect number of words from the API.");
    }

    return wordsArray;
  } catch (error) {
    console.error("Failed to start the game:", error);
    throw new Error("Game initialization failed. Could not generate words.");
  }
}
