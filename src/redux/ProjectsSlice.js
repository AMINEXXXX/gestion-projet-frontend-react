import { createSlice } from "@reduxjs/toolkit";

const projects = [];

const ProjectsSlice = createSlice({
  name: "projects",
  initialState: projects,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },
});

export const { setProject } = ProjectsSlice.actions;

export default ProjectsSlice.reducer;
