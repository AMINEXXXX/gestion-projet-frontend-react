import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createSprintBacklog, deleteSprintBacklog, getAllSprintBacklog } from "../../APIs/api_sprintBacklog";

export const useGetAllSprintBacklog = (id) =>{
    return  useQuery({
        queryKey: ["allSprintBacklog"],
        queryFn: () => getAllSprintBacklog(id),
      });
}
 

export const useCreateSprintBacklog = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSprintBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allSprintBacklog"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};

export const useDeleteSprintBacklog = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSprintBacklog,
    onSuccess: () => {
      onSuccess && onSuccess();
      queryClient.invalidateQueries({ queryKey: ["allSprintBacklog"] });
    },
    onError: () => {
      onError && onError();
    },
  });
};
