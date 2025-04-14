import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./Slices/popupSlice"
import deleteAllReducer from "./Slices/deleteAllSlice"
import playerReducer from "./Slices/playerSlice";
import quizReducer from "./Slices/quizSlice";
import sessionReducer  from"./Slices/sessionSlice"
export const store = configureStore({
  reducer: {
    popup: popupReducer,
    deleteAll: deleteAllReducer,
    player: playerReducer,
    quiz: quizReducer,
    session: sessionReducer,
  },
});
