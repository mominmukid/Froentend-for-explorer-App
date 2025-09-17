import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isvisibal: true,
};

export const videoslice = createSlice({
  name: "video",
  initialState,
  reducers: {
    toggleIsvisibalfalse: (state) => {
      state.isvisibal = false;
      console.log(state.isvisibal);
    },
    toggleIsvisibalTrue: (state) => {
      state.isvisibal = true;
      console.log(state.isvisibal);
    },
  },
});

export const { toggleIsvisibalfalse, toggleIsvisibalTrue } = videoslice.actions;
export default videoslice.reducer;
