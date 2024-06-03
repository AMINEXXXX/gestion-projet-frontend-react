import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createTask, createTaskEtiquette, deleteAllTasks, deleteTask, deleteTaskEtiquette, getAllTask, updateTask, updateTaskEtiquette } from "../../APIs/api_task";

export const useGetAllTask = (id) =>{
    return  useQuery({
        queryKey: ["allTask", id],
        queryFn: () => getAllTask(id)
      });
}
 

export const useCreateTask = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
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
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
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
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteAllTasks = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllTasks,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateTaskEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateTaskEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteTaskEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allTask"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
