// features/player/playerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: {
    player1: {
      name: "",
      company: "",
      score: 0,
      isReady: false,
    },
    player2: {
      name: "",
      company: "",
      score: 0,
      isReady: false,
    },
  },
  currentPlayer: null, // tracks which player this instance represents (1 or 2)
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Set which player this instance represents (1 or 2)
    setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
    },

    // Update player info by player number
    setPlayerInfo: (state, action) => {
      const { playerNumber, name, company } = action.payload;
      if (state.players[`player${playerNumber}`]) {
        state.players[`player${playerNumber}`].name = name;
        state.players[`player${playerNumber}`].company = company;
        state.players[`player${playerNumber}`].isReady = true;
      }
    },

    // Update score for a specific player
    updateScore: (state, action) => {
      const { playerNumber, score } = action.payload;
      if (state.players[`player${playerNumber}`]) {
        state.players[`player${playerNumber}`].score = score;
      }
    },

    // Reset all players
    resetPlayers: (state) => {
      state.players = {
        player1: {
          name: "Waiting...",
          company: "",
          score: 0,
          isReady: false,
        },
        player2: {
          name: "Waiting...",
          company: "",
          score: 0,
          isReady: false,
        },
      };
      state.currentPlayer = null;
    },

    // Mark player as ready
    setPlayerReady: (state, action) => {
      const { playerNumber } = action.payload;
      if (state.players[`player${playerNumber}`]) {
        state.players[`player${playerNumber}`].isReady = true;
      }
    },
  },
});

export const {
  setCurrentPlayer,
  setPlayerInfo,
  updateScore,
  resetPlayers,
  setPlayerReady,
} = playerSlice.actions;

export default playerSlice.reducer;
