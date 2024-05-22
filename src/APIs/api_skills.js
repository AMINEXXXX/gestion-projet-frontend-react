import axios from "axios";

export const getAllSkills = async () => {
  const url = "/skills";
  const { data } = await axios.get(url);
  return data || [];
}