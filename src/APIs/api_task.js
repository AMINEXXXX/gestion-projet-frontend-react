import axios from "axios";

export const getAllTask = async () => {
  const url = "/task";
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