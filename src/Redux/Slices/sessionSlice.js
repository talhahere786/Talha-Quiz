// features/session/sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const generateSessionId = () => {
  return `SES-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
};

const initialState = {
  sessionId: generateSessionId(),
  gameStarted: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
    },
    resetGame: (state) => {
      state.gameStarted = false;
    },
    generateNewSessionId: (state) => {
      state.sessionId = generateSessionId();
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
  },
});

export const { startGame, resetGame, generateNewSessionId, setSessionId } =
  sessionSlice.actions;
export default sessionSlice.reducer;
