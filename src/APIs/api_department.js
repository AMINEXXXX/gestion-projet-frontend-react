import axios from "axios";

export const getAllDepartment = async () => {
  const url = "/departements";
  const { data } = await axios.get(url);
  return data || [];
};


export const createDepartment = async (department) => {
  const url = "/departements";
  return await axios.post(url, department);
};

export const deleteDepartment = async (id) => {
  const url = `/departements/${id}`;
  return await axios.delete(url);
};
