import axios from "axios";

export const getAllUserStory = async (id) => {
  const url = `/user_story/${id}`;
  const { data } = await axios.get(url);

  return data || [];
}

export const createUserStory = async (user_story) => {
  const url = "/user_story";
  return await axios.post(url, user_story);
}

export const updateUserStory = async (user_story) => {
  const url = `/user_story/${user_story.id}`;
  return await axios.put(url, user_story);
}

export const deleteUserStory = async (id) => {
  const url = `/user_story/${id}`;
  return await axios.delete(url);
}

export const deleteAllUserStory = async (user_stories) => {
  const url = "/user_story/deleteAll";
  return await axios.delete(url, {data: user_stories});
}

export const createStoryEtiquette = async (etiqutte) => {
  const url = "/story_etiquette";
  return await axios.post(url, etiqutte);
}

export const updateStoryEtiquette = async (etiqutte) => {
  const url = `/story_etiquette/${etiqutte.id}`;
  return await axios.put(url, etiqutte);
}

export const deleteStoryEtiquette = async (id) => {
  const url = `/story_etiquette/${id}`;
  return await axios.delete(url);
}
