import geminiLLM from "./llm";

// Function to handle the overall game flow (generating words from theme)
export async function startGame(theme) {
  if (!theme) {
    throw new Error("Please provide a theme to start the game.");
  }

  try {
    const jsonResponse = await geminiLLM.generateWordsFromTheme(theme);
    console.log("The json response is: ", jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Failed to start the game:", error);
    throw new Error("Game initialization failed. Could not generate words.");
  }
}
