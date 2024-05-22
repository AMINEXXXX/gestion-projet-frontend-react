import { createSlice } from "@reduxjs/toolkit";

const project = {
  id: 0,
  name: "",
  description: "",
  start_date: "",
  price: 0,
  duration: "",
};

const ProjectSlice = createSlice({
  name: "project",
  initialState: { project },
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { setProject } = ProjectSlice.actions;

export default ProjectSlice.reducer;
