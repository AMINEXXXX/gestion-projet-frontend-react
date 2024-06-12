import { useGetAllUserStoryById } from "../../../../hooks/api/useUserStoryApi";
function createData(id, name, description, etiquettes, tasks) {
  return { id, name, description, etiquettes, tasks };
}

export default function useAllStories(id) {
  const { data } = useGetAllUserStoryById(id);

  const storiesData = data?.map((e) => createData(e.id, e.name, e.description, e.etiquettes, e.tasks));
  

  return { storiesData };
}
