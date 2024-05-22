import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createUserStory, deleteUserStory, getAllUserStory } from "../../APIs/api_userStory";

export const useGetAllUserStory = ({ onSuccess, onError } = {}) =>{
    return  useQuery({
        queryKey: ["allUserStory"],
        queryFn: getAllUserStory,
        onSuccess: () => {
            onSuccess && onSuccess();
          },
          onError: () => {
            onError && onError();
          },
      });
}
 

export const useCreateUserStory = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserStory,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteUserStory = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserStory,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
