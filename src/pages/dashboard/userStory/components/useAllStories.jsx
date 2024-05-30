import { useGetAllUserStoryById } from "../../../../hooks/api/useUserStoryApi";
function createData(id, name, etiquettes, tasks) {
  return { id, name, etiquettes, tasks };
}

export default function useAllStories(id) {
  const { data } = useGetAllUserStoryById(id);

  const storiesData = data?.map((e) => createData(e.id, e.name, e.etiquettes, e.tasks));
  

  return { storiesData };
}
