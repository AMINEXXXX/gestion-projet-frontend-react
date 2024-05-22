import { useQuery } from "@tanstack/react-query";

import { getAllSkills } from "../../APIs/api_skills";

export const useGetAllSkills = ({ onSuccess, onError } = {}) => {
  return useQuery({
    queryKey: ["allSkills"],
    queryFn: getAllSkills,
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
};
