import { configureStore } from "@reduxjs/toolkit";

import GlobalReducer from "./GlobalSlice";
import ThemeReducer from "./ThemeSlice";
import AuthReducer from "./Authslice";
import DepartmentReducer from "./Department";
import PageSlice from "./PageSlice";
import ProjectSlice from "./ProjectSlice";

export default configureStore({
  reducer: {
    global: GlobalReducer,
    authentication: AuthReducer,
    theme: ThemeReducer,
    department: DepartmentReducer,
    page: PageSlice,
    project: ProjectSlice,
  },
});
