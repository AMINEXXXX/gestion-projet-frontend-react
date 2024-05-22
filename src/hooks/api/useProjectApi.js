import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProject,
  deleteProject,
  getAllProject,
  updateProject,
  getProjectById,
} from "../../APIs/api_project";
import { useEffect, useState } from "react";

export const useGetAllProject = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: [["allProject"], ["Project"]],
    queryFn: getAllProject,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetProjectById = ( id ) => {
  return useQuery({
    queryKey: ["Project"],
    queryFn: () => getProjectById(id),
    retry: 5,
    select: (data) => {
      console.log(data);
      return data;
    }
  });
};

export const useCreateProject = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: [["allProject"], ["Project"]] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateProject = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: [["allProject"], ["Project"]] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteProject = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: [["allProject"], ["Project"]] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
