import React, { useState } from "react";
import ProjectLayout from "./ProjectLayout";
import { useGetProjectById } from "../../../../hooks/api/useProjectApi";
import ProductBacklog from "../../productBacklog/components/ProductBacklog";
import Progress from "./Progress/Progress";
import UserStory from "../../userStory/components/UserStory";
import Task from "../../task/components/Task";
import SprintBacklog from "../../sprintBacklog/components/SprintBacklog";
import { useSelector } from "react-redux";

export default function Project() {
  const { project } = useSelector((state) => state.project);
  const [Project, setProject] = useState(useGetProjectById(project.id).data);
  const [progress, setProgress] = useState(true);
  const [product, setProduct] = useState(false);
  const [story, setStory] = useState(false);
  const [task, setTask] = useState(false);
  const [sprint, setSprint] = useState(false);
  const [open, setOpen] = useState(true);


  return (
    <ProjectLayout
      project={project}
      setProgress={setProgress}
      setProduct={setProduct}
      setStory={setStory}
      setTask={setTask}
      setSprint={setSprint}
      open={open}
    >
      <div
        style={{
          height: "100vh",
        }}
      >
        {progress && <Progress project={project} />}
        {product && <ProductBacklog project={project} />}
        {story && <UserStory project={project} />}
        {task && <Task project={project} />}
        {sprint && <SprintBacklog project={project} />}
      </div>
    </ProjectLayout>
  );
}
