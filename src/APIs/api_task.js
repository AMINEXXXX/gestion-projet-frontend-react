import axios from "axios";

export const getAllTask = async (id) => {
  const url = `/task/${id}`;
  const { data } = await axios.get(url);
  return data || [];
}

export const createTask = async (task) => {
  const url = "/task";
  return await axios.post(url, task);
}

export const updateTask = async (task) => {
  const url = `/task/${task.id}`;
  return await axios.put(url, task);
}

export const deleteTask = async (id) => {
  const url = `/task/${id}`;
  return await axios.delete(url);
}

export const deleteAllTasks = async (tasks) => {
  const url = "/task/deleteAll";
  return await axios.delete(url, {data: tasks});
}

export const createTaskEtiquette = async (etiqutte) => {
  const url = "/task_etiquette";
  return await axios.post(url, etiqutte);
}

export const updateTaskEtiquette = async (etiqutte) => {
  const url = `/task_etiquette/${etiqutte.id}`;
  return await axios.put(url, etiqutte);
}

export const deleteTaskEtiquette = async (id) => {
  const url = `/task_etiquette/${id}`;
  return await axios.delete(url);
}
