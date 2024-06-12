import Modal from "../../../../../components/Modal/Modal";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUpdateUser } from "../../../../../hooks/api/useUserApi";

export default function UpdateUser({ data }) {
  const mutation = useUpdateUser();
  const [userData, setUserData] = useState();

  const handleUpdate = () => {
    if (userData?.userPassword !== userData?.userPasswordConfirm) return false;
    const user = {
      id: data?.id,
      fullName: userData?.userName,
      userNumber: userData?.userNbr,
      role: userData?.userRole,
      password: userData?.userPassword,
    };


    mutation.mutate(user);
    return true;
  };

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={"Update l'utilisateur "}
        modalActionName={"Update"}
        modalActionEvent={handleUpdate}
      >
        <CreateUpdateForm
          data={data}
          setUserData={setUserData}
          isUpdate={true}
        />
      </Modal>
    </>
  );
}

UpdateUser.propTypes = {
  data: PropTypes.object,
};
