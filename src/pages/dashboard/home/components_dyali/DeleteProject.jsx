import { Typography } from "@mui/material";
import Modal from "../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteProject } from "../../../../hooks/api/useProjectApi";

export default function DeleteProject({ data }) {
  const mutation = useDeleteProject();

  return (
    <>
      <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer le projet "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(data.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer le projet «{data?.name?.charAt(0)?.toUpperCase() + data?.name?.slice(1)} »
        </Typography>
      </Modal>
    </>
  );
}

DeleteProject.propTypes = {
  data: PropTypes.object,
};
