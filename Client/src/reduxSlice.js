import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  stoken: "",
  updateCount: 0,
};

const tokenSlice = createSlice({
  name: "spotifytoken",
  initialState,
  reducers: {
    setStoken(state, action) {
      // console.log("action in slice, ", action )
      state.stoken = action.payload;
      state.updateCount += 1;
    },
  },
});

export const { setStoken } = tokenSlice.actions;
export default tokenSlice.reducer;
