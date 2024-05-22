import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/error/NotFound.jsx";
import Authentication from "../pages/authentication/index.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import { useSideMenuRouter } from "./SideMenuRouter.jsx";
import { useEffect, useState } from "react";
import Project from "../pages/dashboard/project/components/Project.jsx";
import ProductBacklog from "../pages/dashboard/productBacklog/components/ProductBacklog.jsx";
import UserStory from "../pages/dashboard/userStory/components/UserStory.jsx";
import SprintBacklog from "../pages/dashboard/sprintBacklog/components/SprintBacklog.jsx";
import Task from "../pages/dashboard/task/components/Task.jsx";
import { useSelector } from "react-redux";
import ProjectLayout from "../pages/dashboard/project/components/ProjectLayout.jsx";

export default function MainRoute() {
  const {firstPage} = useSelector((state) => state.page);

  const sideMenuRouter = useSideMenuRouter();
  // console.log("sideMenuRouter", sideMenuRouter);

  const [showNotFound, setShowNotFound] = useState(false);
  useEffect(() => {
    if (!sideMenuRouter.length) setShowNotFound(true);
  }, [sideMenuRouter]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
          {firstPage ? (
            <Route path="/dashboard" element={<Dashboard />}>
              {[...sideMenuRouter]}
            </Route>
          ) : (
            <Route path="/dashboard/project" element={<Project />} />
          )}
          <Route path="/dashboard/product" element={<Project />} />
          <Route path="/dashboard/story" element={<Project />} />
          <Route path="/dashboard/task" element={<Project />} />
          <Route path="/dashboard/sprint" element={<Project />} />
          <Route path="/" element={<Authentication />} />
          <Route path="/not-found" element={showNotFound && <NotFound />} />
          <Route path="*" element={showNotFound && <NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
