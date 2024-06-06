import React from "react";
import Modal from "../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useState } from "react";
import { useCreateProject } from "../../../../hooks/api/useProjectApi";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

export default function CreateProject() {
  const [projectData, setProjectData] = useState(null);
  const [formError, setFormError] = useState(null);
  const user = useSelector((state) => state.authentication.user);

  const mutation = useCreateProject({
    onError: () => setFormError("vérifiez vos informations"),
  });

  const handelAction = () => {
    console.log(projectData.start_date);
    if (
      !projectData.name.trim() ||
      !projectData.description.trim() ||
      !projectData.duration.trim() ||
      !projectData.price.trim() ||
      projectData.start_date == null
    ) {
      setFormError("vérifiez vos informations");
      return false;
    }

    const p = {
      name: projectData.name,
      description: projectData.description,
      duration: projectData.duration,
      start_date: projectData.start_date,
      price: projectData.price,
      projectManager: {
        id: user.id,
      },
      projectTeam: projectData.projectTeam,
    };

    console.log(p);

    mutation.mutate(p);

    setFormError(null);
    return true;
  };

  return (
    <>
      <Modal
        btnName={"Créer un Projet"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer un Projet "}
        modalActionName={"Créer"}
        modalActionEvent={handelAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateUpdateForm setProjectData={setProjectData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
