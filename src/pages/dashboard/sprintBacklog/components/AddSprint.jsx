import { Alert } from "@mui/material";
import Modal from "../../../../components/Modal/Modal"
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { CreateForm } from "./CreateForm";
import { useState } from "react";

export default function AddSprint() {
  const [sprintData, setSprintData] = useState(null);
  const [formError, setFormError] = useState(null);

  // const mutation = useCreateUser({
  //   onError: () => setFormError("vérifiez vos informations"),
  // });

  const handelAction = () => {
    const sprint = {
      name: sprintData.name.trim(),
      duration: sprintData.duration,
      start_date: sprintData.start_date,
      end_date: sprintData.end_date,
      goal: sprintData.goal,
    };
    console.log(sprint);
    // mutation.mutate(sprint);

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
