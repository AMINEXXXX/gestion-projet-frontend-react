import { IconButton, Typography } from "@mui/material";
import Modal from "../../../../../components/Modal/Modal";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PropTypes from "prop-types";
import { useDeleteUserStory } from "../../../../../hooks/api/useUserStoryApi";
import { red } from "@mui/material/colors";

export default function DeleteStory({ story }) {
  const mutation = useDeleteUserStory();

  return (
    <>
      {/* <Modal
        btnIcon={<DeleteRoundedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer le user story "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(story.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer le user story «{story?.name?.charAt(0)?.toUpperCase() + story?.name?.slice(1)} »
        </Typography>
      </Modal> */}
      <IconButton
        onClick={() => (mutation.mutate(story.id), console.log(story.id))}
      >
        <DeleteRoundedIcon sx={{ color: red[500] }} />
      </IconButton>
    </>
  );
}

DeleteStory.propTypes = {
  data: PropTypes.object,
};
