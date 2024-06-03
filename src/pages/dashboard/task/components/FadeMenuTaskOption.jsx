import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import {
  useCreateUserStory,
  useDeleteUserStory,
} from "../../../../hooks/api/useUserStoryApi";
import { red } from "@mui/material/colors";
import { useDeleteTask } from "../../../../hooks/api/useTaskApi";

export default function FadeMenuTaskOption({ productId, task }) {
  const mutationStory = useCreateUserStory();
  const mutationTask = useDeleteTask();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() =>(
            mutationStory.mutate({
              name: task.name,
              productBacklog: {
                id: productId,
              },
            }),
            mutationTask.mutate(task.id)
          )}
        >
          Convertir a User Story
        </MenuItem>
        <MenuItem
          sx={{ color: red[500] }}
          onClick={() => mutationTask.mutate(task.id)}
        >
          Supprimer
        </MenuItem>
      </Menu>
    </div>
  );
}
