import { createSlice } from "@reduxjs/toolkit";

const deleteAllSlice = createSlice({
  name: "deleteAll",
  initialState: {
    isDeleted: false,
  },
  reducers: {
    deleteall: (state) => {
      state.isDeleted = true;
    },
  },
});

export const { deleteall } = deleteAllSlice.actions;
export default deleteAllSlice.reducer;
