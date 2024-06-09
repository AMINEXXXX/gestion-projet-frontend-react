import React, { useEffect, useState } from "react";
import ProjectLayout from "./ProjectLayout";
import ProductBacklog from "../../productBacklog/components/ProductBacklog";
import Progress from "./Progress/Progress";
import UserStory from "../../userStory/components/UserStory";
import Task from "../../task/components/Task";
import SprintBacklog from "../../sprintBacklog/components/SprintBacklog";
import { useSelector } from "react-redux";

export default function Project() {
  const { project } = useSelector((state) => state.project);
  const [path, setPath] = useState("progress");
  const [open, setOpen] = useState(true);

  useEffect(() => {

  }, [setPath]);


  return (
    <ProjectLayout
      project={project}
      open={open}
      setPath={setPath}
    >
      <div
        style={{
          height: "100vh",
        }}
      >
        {path == "progress" && <Progress project={project} />}
        {path == "product" && <ProductBacklog project={project} />}
        {path == "story" && <UserStory project={project} />}
        {path == "task" && <Task project={project} />}
        {path == "sprint" && <SprintBacklog project={project} />}
      </div>
    </ProjectLayout>
  );
}
