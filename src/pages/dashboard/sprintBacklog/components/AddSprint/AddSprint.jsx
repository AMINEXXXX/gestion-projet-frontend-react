import { Alert } from "@mui/material";
import Modal from "../../../../../components/Modal/Modal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateForm } from "./CreateForm";
import { useState } from "react";
import { useCreateSprintBacklog } from "../../../../../hooks/api/useSprintBacklogApi";
import { useSelector } from "react-redux";

export default function AddSprint() {
  const { project } = useSelector((state) => state.project);
  const [sprintData, setSprintData] = useState(null);
  const [formError, setFormError] = useState(null);
  const mutation = useCreateSprintBacklog();

  const handelAction = () => {
    if (sprintData.start_date == null) {
      setFormError("Date can not be null");
      return;
    }
    const sprint = {
      name: sprintData.name.trim(),
      duration: sprintData.duration,
      start_date: sprintData.start_date,
      goal: sprintData.goal,
      userStories: sprintData.userStories,
      project: {
        id: project?.id,
      },
    };
    console.log(sprint);
    mutation.mutate(sprint);

    setFormError(null);
    return true;
  };

  return (
    <>
      <Modal
        btnName={" Créer une sprint"}
        btnIcon={<AddRoundedIcon />}
        modalTitle={" Créer une sprint"}
        modalActionName={"Créer"}
        modalActionEvent={handelAction}
        modalFinalEvent={() => setFormError(null)}
      >
        <CreateForm setSprintData={setSprintData} />
        {formError && (
          <Alert severity="error" sx={{ mt: 1, mb: 4 }}>
            {formError}
          </Alert>
        )}
      </Modal>
    </>
  );
}
