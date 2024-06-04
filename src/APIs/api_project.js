import axios from "axios";

export const getAllProject = async () => {
  const url = "/projects";
  const { data } = await axios.get(url);
  return data || [];
};

export const getTeam = async (id) => {
  const url = `/projects/${id}/team`;
  const { data } = await axios.get(url);
  return data || [];
};

export const getProjectById = async (id) => {
  const url = `/projects/${id}`;
  const { data } = await axios.get(url);
  return data || [];
};

export const createProject = async (project) => {
  const url = "/projects";
  return await axios.post(url, project);
};

export const updateProject = async (newProject) => {
  console.log(newProject);
  const url = `/projects/${newProject.id}`;
  return await axios.put(url, newProject);
};

export const deleteProject = async (id) => {
  const url = `/projects/${id}`;
  return await axios.delete(url);
};
