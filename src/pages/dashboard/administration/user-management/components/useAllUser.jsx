import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleateUser";
import { user_role as roles } from "../../../../../global";
import { useGetAllUser } from "../../../../../hooks/api/useUserApi";

const createData = (id, user_name, user_nbr, user_role) => {
  return { id, user_name, user_nbr, user_role };
};

export default function useAllUser() {
  const allUsers = useGetAllUser();
  console.log(allUsers.data);
  const userData = allUsers?.data?.map((e) =>
    createData(e.id, e.fullName, e.userNumber, e.role)
  );

  console.log(userData);

  const columns = [
    {
      field: "user_name",
      headerName: "Nom",
      width: 180,
      flex: 1.5,
    },
    { field: "user_nbr", headerName: "Matricule", width: 180 },
    {
      field: "user_role",
      headerName: "Roles",
      width: 180,
      flex: 1.5,
      renderCell: (params) =>
        params.row.user_role.map((e) => roles[e]).join(", "),
    },
    {
      field: "action",
      headerName: "",
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
