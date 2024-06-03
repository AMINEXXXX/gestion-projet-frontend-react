import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createStoryEtiquette,
  createUserStory,
  deleteAllUserStory,
  deleteStoryEtiquette,
  deleteUserStory,
  getAllUserStory,
  updateStoryEtiquette,
  updateUserStory,
} from "../../APIs/api_userStory";

export const useGetAllUserStoryById = (id) => {
  return useQuery({
    queryKey: ["allUserStory", id],
    queryFn: () => getAllUserStory(id),
    select: (data) => {
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

export const useDeleteAllUserStory = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllUserStory,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateStoryEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStoryEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateStoryEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStoryEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteStoryEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStoryEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
