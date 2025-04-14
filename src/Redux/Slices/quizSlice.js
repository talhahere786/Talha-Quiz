import { createSlice } from "@reduxjs/toolkit";

// Load questions from localStorage or use fallback
const loadQuestions = () => {
  const savedQuestions = localStorage.getItem('quiz-questions');
  if (savedQuestions) {
    return JSON.parse(savedQuestions);
  }
  return [
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "Which Planet is known as the Red Planet",
      options: ["Jupiter", "Venus", "Mars", "Saturn"],
      correctAnswer: 3,
    },
    // ... other default questions
  ];
};
// Helper function to get initial time from localStorage
const getInitialTimeLeft = () => {
  const savedSettings = localStorage.getItem('gameSettings');
  if (savedSettings) {
    const { gameSessionTime } = JSON.parse(savedSettings);
    return gameSessionTime || 10; // Default to 60 if not found
  }
  return 10; // Default value
};
const initialState = {
  questions: loadQuestions(),
  currentQuestionIndex: 0,
  selectedOption: "",
  score: 0,
  timeLeft: getInitialTimeLeft(),
  quizEnded: false,
  answered: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectOption: (state, action) => {
      if (state.answered) return;

      state.selectedOption = action.payload;
      state.answered = true;

      // Compare with the correctAnswer index (number) rather than value (string)
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (
        action.payload ===
        currentQuestion.options[currentQuestion.correctAnswer]
      ) {
        state.score += 1;
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.currentQuestionIndex = 0; // Loop back to first question
      }
      state.selectedOption = null;
      state.answered = false;
    },
    decrementTime: (state) => {
      state.timeLeft -= 1;
      if (state.timeLeft === 0) {
        state.quizEnded = true;
      }
    },
    restartQuiz: (state) => {
      return {
        ...initialState,
        questions: state.questions, // Keep the same questions
      };
    },
  },
});

export const { selectOption, nextQuestion, decrementTime, restartQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
