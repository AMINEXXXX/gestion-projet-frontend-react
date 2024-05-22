import React from "react";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useState } from "react";
import { useCreateProject } from "../../../../hooks/api/useProjectApi";
import { useSelector } from "react-redux";

export default function CreateProject() {
  const [projectData, setProjectData] = useState(null);
  const [formError, setFormError] = useState(null);
  const user = useSelector((state) => state.authentication.user);

  const mutation = useCreateProject({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const handelAction = () => {
    const p = {
      name: projectData.name,
      description: projectData.description,
      duration: projectData.duration,
      price: projectData.price,
      projectManager: {
        id: user.id,
      },
    };

    mutation.mutate(p);

    setFormError(null);
    return true;
  };

  return (
    <>
      <Modal
        btnName={"Projet"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un Projet "}
        modalActionName={"Créer"}
        modalActionEvent={handelAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setProjectData={setProjectData} />
      </Modal>
    </>
  );
}
