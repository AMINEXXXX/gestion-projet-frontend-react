import Modal from "../../../../../components/Modal/Modal";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import PropTypes from "prop-types";
import { CreateUpdateForm } from "./CreateUpdateForm";
import { useUpdateSprintBacklog } from "../../../../../hooks/api/useSprintBacklogApi";
import { useState } from "react";

export default function UpdateSprint({ title, data }) {
  const [sprintData, setSprintData] = useState(null);
  const [formError, setFormError] = useState(null);
  const mutation = useUpdateSprintBacklog();

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
        justTitle={title}
        modalTitle={"Modifier Sprint"}
        modalActionName={"Modifier"}
        modalActionEvent={handelAction}
      >
        <CreateUpdateForm setSprintData={setSprintData} data={data} isUpdate={true} />
      </Modal>
    </>
  );
}

UpdateSprint.propTypes = {
  data: PropTypes.object,
};
