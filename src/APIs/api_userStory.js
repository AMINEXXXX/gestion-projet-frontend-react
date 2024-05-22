import axios from "axios";

export const getAllUserStory = async () => {
  const url = "/user_story";
  const { data } = await axios.get(url);
  return data || [];
}

export const createUserStory = async (user_story) => {
  const url = "/user_story";
  return await axios.post(url, user_story);
}

export const deleteUserStory = async (id) => {
  const url = `/user_story/${id}`;
  return await axios.delete(url);
}