import { useGetAllMembers } from "../../../../hooks/api/useUserApi";

export default function useGetAllTeamMembers() {
  const { data } = useGetAllMembers();

  return data;
}
