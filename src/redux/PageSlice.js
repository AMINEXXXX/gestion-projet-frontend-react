import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
  name: "page",
  initialState: {
    firstPage: true,
  },
  reducers: {
    setFirstPage: (state) => {
      state.firstPage = !(state.firstPage);
    },
  },
});




export const { setFirstPage } = PageSlice.actions;

export default PageSlice.reducer;
