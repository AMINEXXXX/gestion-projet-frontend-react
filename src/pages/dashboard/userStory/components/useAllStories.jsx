import { useGetAllUserStoryById } from "../../../../hooks/api/useUserStoryApi";
function createData(id, name, etiquettes) {
  return { id, name, etiquettes };
}

export default function useAllStories(id) {
  const { data } = useGetAllUserStoryById(id);

  const storiesData = data?.map((e) => createData(e.id, e.name, e.etiquettes));
  

  return { storiesData };
}
