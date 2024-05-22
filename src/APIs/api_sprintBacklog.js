import axios from "axios";

export const getAllSprintBacklog = async () => {
  const url = "/sprint_backlog";
  const { data } = await axios.get(url);
  return data || [];
}

export const createSprintBacklog = async (sprint_backlog) => {
  const url = "/sprint_backlog";
  return await axios.post(url, sprint_backlog);
}

export const deleteSprintBacklog = async (id) => {
  const url = `/sprint_backlog/${id}`;
  return await axios.delete(url);
}