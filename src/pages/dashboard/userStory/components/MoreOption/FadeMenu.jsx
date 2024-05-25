import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDeleteUserStory } from "../../../../../hooks/api/useUserStoryApi";
import { Box, IconButton, Tooltip } from "@mui/material";
import { red, teal } from "@mui/material/colors";

export default function FadeMenu({ story }) {
  const mutation = useDeleteUserStory();
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
        <MoreVertRoundedIcon />
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
        <Box sx={{display: "flex", flexDirection: "column", my: -0.5}}>
          <Tooltip title="Edit" placement="top">
            <MenuItem onClick={handleClose}>
            {/* <IconButton> */}
              <EditRoundedIcon sx={{ color: teal[500] }} />
            {/* </IconButton> */}
            </MenuItem>
          </Tooltip>
          <Tooltip title="Delete">
            <MenuItem onClick={() => (mutation.mutate(story.id), handleClose())}>
            {/* <IconButton> */}
              <DeleteRoundedIcon sx={{ color: red[500] }} />
            {/* </IconButton> */}
            </MenuItem>
          </Tooltip>
        </Box>
      </Menu>
    </div>
  );
}
