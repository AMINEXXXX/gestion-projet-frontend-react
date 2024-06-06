import { useGetAllSprintBacklog } from "../../../../../hooks/api/useSprintBacklogApi";
import useGetOneProject from "../../../project/components/useGetOneProject";

export default function useAllSprint() {
  const { projectData } = useGetOneProject();
  const sprintsData = useGetAllSprintBacklog(projectData?.id)?.data;

  console.log(sprintsData);

  return { sprintsData };
}
