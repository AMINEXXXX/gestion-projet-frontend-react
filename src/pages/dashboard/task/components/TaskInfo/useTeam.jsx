import React from "react";
import { useSelector } from "react-redux";
import { useGetTeam } from "../../../../../hooks/api/useProjectApi";

export default function useTeam() {
  const { project } = useSelector((state) => state.project);
  const { data } = useGetTeam(project?.id);

  return data;
}
