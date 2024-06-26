import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProductBacklog,
  createProductBacklogEtiquette,
  deleteProductBacklog,
  deleteProductBacklogEtiquette,
  getAllProductBacklog,
  getProductBacklogsById,
  updateProductBacklog,
  updateProductBacklogEtiquette,
} from "../../APIs/api_productBacklog";

export const useGetAllProductBacklog = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allProductBacklog"],
    queryFn: getAllProductBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useGetProductBacklogById = (id) => {
  return useQuery({
    queryKey: ["productBacklogById"],
    queryFn: () => getProductBacklogsById(id),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
    select: (data) => {
      return data;
    }
  });
};

export const useUpdateProductBacklog = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["productBacklogById"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateProductBacklog = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["productBacklogById"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteProductBacklog = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["productBacklogById"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useCreateProductBacklogEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductBacklogEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["productBacklogById"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useUpdateProductBacklogEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductBacklogEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["productBacklogById"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteProductBacklogEtiquette = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductBacklogEtiquette,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["productBacklogById"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
