import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import { useDeleteUserStory } from "../../../../hooks/api/useUserStoryApi";
import DeleteStory from "../../userStory/components/MoreOption/DeleteStory";
import { useCreateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";

export default function FadeMenu({ story }) {
  const { project } = useSelector((state) => state.project);
  const mutationProduct = useCreateProductBacklog();
  const mutationStory = useDeleteUserStory();
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
          onClick={() => (
            mutationProduct.mutate({
              name: story.name,
              project: { id: project.id },
            }),
            mutationStory.mutate(story.id)
          )}
        >
          Convertir a Product backlog
        </MenuItem>
          <MenuItem sx={{color: red[500]}} onClick={() => mutationStory.mutate(story.id)}>
            Supprimer
          </MenuItem>
      </Menu>
    </div>
  );
}
