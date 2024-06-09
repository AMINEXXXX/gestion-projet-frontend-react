import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PropTypes from "prop-types";
import { useDeleteUserStory } from "../../../../../hooks/api/useUserStoryApi";

export default function DeleteStory({ story }) {
  const mutation = useDeleteUserStory();


  return (
    <>
      {/* <Modal
        btnIcon={<DeleteOutlinedIcon />}
        btnColor={"error"}
        modalTitle={"Supprimer le user story "}
        modalActionName={"Supprimer"}
        btnActionColor={"error"}
        modalActionEvent={() => {
          mutation.mutate(story.id);
        }}
      >
        <Typography variant="p" component="p" sx={{ my: 2 }}>
          souhaitez-vous supprimer la user story «
          {story?.name?.charAt(0)?.toUpperCase() + story?.name?.slice(1)} »
        </Typography>
      </Modal> */}
      {/* <Avatar variant="rounded" sx={{ bgcolor: "#FFF" }}>
        <Box onClick={() => (mutation.mutate(story.id), console.log(story.id))}>
          <DeleteOutlinedIcon
            color="error"
            sx={{
              padding: 1,
              fontSize: 40,
              "&:hover": { bgcolor: "#ffebeeff" },
            }}
          />
        </Box>
      </Avatar> */}
      <IconButton
        sx={{ "&:hover": { bgcolor: "#ffebeeff" } }}
        onClick={() => (mutation.mutate(story.id), console.log(story.id))}
      >
        <DeleteOutlinedIcon color="error" />
      </IconButton>
    </>
  );
}

DeleteStory.propTypes = {
  data: PropTypes.object,
};
