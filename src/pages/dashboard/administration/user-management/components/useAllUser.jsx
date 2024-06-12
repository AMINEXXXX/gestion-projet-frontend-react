import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleateUser";
import { user_role as roles } from "../../../../../global";
import { useGetAllUser } from "../../../../../hooks/api/useUserApi";

const createData = (id, user_name, user_nbr, user_role, skills) => {
  return { id, user_name, user_nbr, user_role, skills };
};

export default function useAllUser() {
  const allUsers = useGetAllUser();
  console.log(allUsers.data);
  const userData = allUsers?.data?.map((e) =>
    createData(e.id, e.fullName, e.userNumber, e.role, e.skills)
  );

  console.log(userData);

  const columns = [
    {
      field: "user_name",
      headerName: "Nom",
      flex: 1,
    },
    { field: "user_nbr", headerName: "Matricule", flex: 1 },
    {
      field: "user_role",
      headerName: "Roles",
      flex: 2,
      renderCell: (params) =>
        params.row.user_role.map((e) => roles[e]).join(", "),
    },
    // {
    //   field: "skills",
    //   headerName: "Skills",
    //   width: 180,
    //   flex: 2,
    //   renderCell: (params) => params.row.skills.map((e) => e?.skill).join(", "),
    // },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <UpdateUser data={params.row} />
            <DeleteUser data={params.row} />
          </>
        );
      },
    },
  ];
  return { userData, columns };
}
