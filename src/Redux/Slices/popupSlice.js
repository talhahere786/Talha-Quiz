import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    isNewSessionPopupOpen: false
  },
  reducers: {
    openNewSessionPopup: (state) => {
      
      state.isNewSessionPopupOpen = true;
      console.log("Inslice:",state.isNewSessionPopupOpen);
    },
  }
});

export const { openNewSessionPopup } = popupSlice.actions;
export default popupSlice.reducer;