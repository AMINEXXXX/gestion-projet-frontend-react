import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createUser, deleteUser, getAllMembers, getAllUser } from "../../APIs/api_user";

export const useGetAllUser = ({ onSuccess, onError } = {}) =>{
    return  useQuery({
        queryKey: ["allUser"],
        queryFn: getAllUser,
        onSuccess: () => {
            onSuccess && onSuccess();
          },
          onError: () => {
            onError && onError();
          },
      });
}

export const useGetAllMembers = ({ onSuccess, onError } = {}) =>{
  return  useQuery({
      queryKey: ["allMembers"],
      queryFn: getAllMembers,
      onSuccess: () => {
          onSuccess && onSuccess();
        },
        onError: () => {
          onError && onError();
        },
    });
}
 

export const useCreateUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUser"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUser"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
