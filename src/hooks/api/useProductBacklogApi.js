import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createProductBacklog, deleteProductBacklog, getAllProductBacklog } from "../../APIs/api_productBacklog";

export const useGetAllProductBacklog = ({ onSuccess, onError } = {}) =>{
    return  useQuery({
        queryKey: ["allProductBacklog"],
        queryFn: getAllProductBacklog,
        onSuccess: () => {
            onSuccess && onSuccess();
          },
          onError: () => {
            onError && onError();
          },
      });
}
 

export const useCreateProductBacklog = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allProductBacklog"] });
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
      queryClient.invalidateQueries({ queryKey: ["allProductBacklog"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
