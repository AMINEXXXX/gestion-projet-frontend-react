import axios from "axios";

export const getAllCommentaire = async (story_id) => {
  const url = `/commentaire/${story_id}`;
  const { data } = await axios.get(url);
  return data || [];
}

export const createCommentaire = async (commentaire) => {
  const url = "/commentaire";
  return await axios.post(url, commentaire);
}

export const updateCommentaire = async (commentaire) => {
  const url = `/commentaire/${commentaire.id}`;
  return await axios.put(url, commentaire);
}

export const deleteCommentaire = async (id) => {
  const url = `/commentaire/${id}`;
  return await axios.delete(url);
}
