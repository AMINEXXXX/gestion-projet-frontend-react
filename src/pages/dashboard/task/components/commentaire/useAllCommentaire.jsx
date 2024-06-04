import React from "react";
import { useGetAllCommentaire } from "../../../../../hooks/api/useCommentaireApi";

const createData = (id, text, date, task, user) => {
  return { id, text, date, task, user };
};

export default function useAllCommentaire(story_id) {
  const { data } = useGetAllCommentaire(story_id);

  const commentaireData = data?.map((e) =>
    createData(e.id, e.text, e.date, e.task, e.user)
  );

  return { commentaireData };
}
