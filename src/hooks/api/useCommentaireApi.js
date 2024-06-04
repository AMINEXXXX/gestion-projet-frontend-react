import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createCommentaire, deleteCommentaire, getAllCommentaire, updateCommentaire } from "../../APIs/api_commentaire";


export const useGetAllCommentaire = (id) =>{
    return  useQuery({
        queryKey: ["allCommentaire", id],
        queryFn: () => getAllCommentaire(id)
      });
}
 

export const useCreateCommentaire = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentaire,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allCommentaire"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateCommentaire = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommentaire,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allCommentaire"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteCommentaire = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentaire,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allCommentaire"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
