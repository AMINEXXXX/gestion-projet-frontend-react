import { useGetAllUserStoryById } from "../../../../hooks/api/useUserStoryApi";
function createData(id, name) {
  return { id, name };
}

export default function useAllStories(id) {
  const { data } = useGetAllUserStoryById(id);

  const storiesData = data?.map((e) => createData(e.id, e.name));
  

  return { storiesData };
}
