import Modal from "../../../../components/Modal/Modal";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PropTypes from "prop-types";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useUpdateProject } from "../../../../hooks/api/useProjectApi";
import { useState } from "react";

export default function UpdateProject({ data }) {
  const mutation = useUpdateProject();

  const [project, setProject] = useState({
    id: data.id,
    name: "",
    description: "",
    price: "",
  })

  return (
    <>
      <Modal
        btnIcon={<EditRoundedIcon />}
        modalTitle={"Mise à jour le Projet "}
        modalActionName={"Update"}
        modalActionEvent={() => {
          mutation.mutate(data.id, project);
        }}
      >
        <CreateUpdateForm data={data} isUpdate={true} setProject={setProject} />
      </Modal>
    </>
  );
}

UpdateProject.propTypes = {
  data: PropTypes.object,
};
