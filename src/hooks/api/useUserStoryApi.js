import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createUserStory,
  deleteUserStory,
  getAllUserStory,
  updateUserStory,
} from "../../APIs/api_userStory";

export const useGetAllUserStoryById = (id) => {
  return useQuery({
    queryKey: ["allUserStory", id],
    queryFn: () => getAllUserStory(id),
    select: (data) => {
      console.log("Stories: ", data);
      return data;
    },
  });
};

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

export const useUpdateUserStory = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserStory,
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
