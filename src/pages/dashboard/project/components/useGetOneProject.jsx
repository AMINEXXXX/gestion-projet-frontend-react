import React from "react";
import { useGetProjectById } from "../../../../hooks/api/useProjectApi";
import { useSelector } from "react-redux";

const createData = (
  id,
  name,
  description,
  duration,
  price,
  start_date,
  productBacklogs,
  projectManager,
  team,
  sprintBacklogs
) => {
  return {
    id,
    name,
    description,
    duration,
    price,
    start_date,
    productBacklogs,
    projectManager,
    team,
    sprintBacklogs,
  };
};

export default function useGetOneProject() {
  const { project } = useSelector((state) => state.project);
  console.log(project);
  const { data } = useGetProjectById(project?.id);

  const projectData = createData(
    data?.id,
    data?.name,
    data?.description,
    data?.duration,
    data?.price,
    data?.start_date,
    data?.productBacklogs,
    data?.projectManager,
    data?.team,
    data?.sprintBacklogs
  );

  return { projectData };
}
