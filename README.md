# Documentation for Scramble Word Game Final Project

## **Overview**

This project is a **Scramble Word Game**, implemented using **React.js**, where users are tasked with unscrambling a set of letters to form a word based on a theme they choose. The application dynamically generates a list of words related to the user's chosen theme using a **Gemini LLM API**, and provides an interactive interface for playing the game. Users can click letters into boxes to construct their answers or click them to reset.

---

## **Features**

1. **Dynamic Word Generation**:

   - Users input a theme, such as "Animals" or "Food."
   - The application generates a list of 10 words related to the theme using an AI-powered LLM.

2. **Interactive Gameplay**:

   - Users drag and drop letters to unscramble words.
   - Words can be reset or checked to determine correctness.

3. **Shuffling Letters**:

   - Letters are shuffled randomly for each word, ensuring variety in gameplay.

4. **Error Handling**:

   - Provides clear feedback in case of API errors or user mistakes.
   - Words are validated in real-time as users interact with the game.

5. **Responsive Design**:

   - The game adjusts to various screen sizes and devices for accessibility.

6. **Developer-Friendly Code**:
   - Organized component-based structure in React.
   - Well-commented and modularized for easy updates and maintenance.

---

## **How the Game Works**

1. **User Inputs Theme**:
   - The game starts by prompting the user to input a theme (e.g., "Sports," "Music").
2. **Generate Words**:

   - A list of 10 words is generated based on the theme using the Gemini LLM API.

3. **Scrambled Letters**:

   - The letters of each word are shuffled and displayed as individual items.

4. **Build Words**:

   - Users click letters into corresponding slots to form the original word.

5. **Check Answer**:

   - The user can check their answer. If correct, a "Correct!" message is displayed; otherwise, they are prompted to try again.

6. **Reset Words**:
   - Users can reset their progress for any word, shuffling the letters and clearing their current attempt.

---

## **Technologies Used**

1. **Frontend**:

   - **React.js**: Main framework for building the interactive user interface.
   - **CSS**: For styling the components and ensuring responsive design.

2. **Backend Logic**:

   - **Gemini LLM API**: Generates theme-based words dynamically.

3. **State Management**:
   - **React `useState` Hook**: Manages the state of words, letters, user answers, and loading/errors.

---

## **Key Components**

### **1. `App.js`**

- The main application component.
- Handles theme input, API integration, and renders the word rows.

### **2. `WordRow.js`**

- Renders each word row with scrambled letters and user answer boxes.
- Contains "Check Answer" and "Reset" buttons.

### **3. `Word.js`**

- Manages the logic for click-based letter interactions.
- Updates the word letters and answer dynamically.

### **4. `Letter.js`**

- Displays individual letters as draggable items.
- Handles interactions like selecting or placing letters.

### **5. `Box.js`**

- Represents the answer slots where users place letters.
- Provides visual feedback when letters are dropped correctly or incorrectly.

---

## **Gemini LLM Integration**

- **API**: Utilizes the **Google Generative AI API** to fetch words based on the user's chosen theme.
- **Data Parsing**: Ensures proper handling of API responses, including JSON validation.
- **Error Handling**: Displays user-friendly messages when API calls fail.

---

## **How to Run the Project**

### **Prerequisites**

- **Node.js** and **npm** installed on your machine.
- A valid **Google Generative AI API key**.

### **Setup Steps**

1. Clone the project from the GitHub repository:  
   [GitHub Repository](https://github.com/khamdam-kadirov/ScrambleWords.git)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set the API key in an `.env` file:
   ```plaintext
   REACT_APP_API_KEY=your-api-key-here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### **Accessing the Game**

- Open your browser and navigate to `http://localhost:3000`.

---

## **Future Enhancements (considerations)**

1. Add a timer for a competitive element.
2. Include hints for difficult words.
3. Expand to multi-player support with leaderboards.
4. Provide a scoring mechanism based on time taken and accuracy.

---

## **Conclusion**

This Scramble Word Game offers an engaging and interactive experience by combining React's dynamic capabilities with AI-driven word generation. The modular design ensures maintainability and adaptability for future extensions. 
