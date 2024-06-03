import React from "react";
import { useGetAllTask } from "../../../../../hooks/api/useTaskApi";

const createData = (id, name, state, etiquettes) => {
  return { id, name, state, etiquettes };
};

export default function useGetAll(id) {
  console.log(id);
  const { data } = useGetAllTask(id);

  const tasksData = data?.map((e) => createData(e.id, e.name, e.state, e.etiquettes ));

  console.log(tasksData);

  return { tasksData };
}
