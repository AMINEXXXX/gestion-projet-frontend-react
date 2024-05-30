import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createTask, deleteTask, getAllTask, updateTask } from "../../APIs/api_task";

export const useGetAllTask = ({ onSuccess, onError } = {}) =>{
    return  useQuery({
        queryKey: ["allTask"],
        queryFn: getAllTask,
        onSuccess: () => {
            onSuccess && onSuccess();
          },
          onError: () => {
            onError && onError();
          },
      });
}
 

export const useCreateTask = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateTask = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteTask = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allUserStory"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
