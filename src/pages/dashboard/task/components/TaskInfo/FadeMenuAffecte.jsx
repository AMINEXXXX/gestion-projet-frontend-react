import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Tooltip } from "@mui/material";
import Affecte from "./Affecte";
import useTeam from "./useTeam";

export default function FadeMenuAffecte({ task, story = null }) {
  const team = useTeam();
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
      {story != null ? (
        task?.teamMember == null ? (
          <IconButton
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <AddOutlined />
          </IconButton>
        ) : (
          <Tooltip title={task?.teamMember?.fullName} placement="top">
            <Avatar sx={{ cursor: "pointer" }}>
              {task?.teamMember?.fullName?.slice(0, 2)}
            </Avatar>
          </Tooltip>
        )
      ) : (
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="inherit"
          variant="contained"
          sx={{ "&:hover": { bgcolor: "#BBB" }, width: "100%", mb: 1 }}
        >
          <AddOutlined sx={{ mr: 1, fontSize: "17.5px" }} />
          Affecte
        </Button>
      )}
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
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <Box />
          <IconButton onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Box>
        {team?.map((member, index) => (
          <Affecte
            key={index}
            task={task}
            member={member}
            handleClose={handleClose}
          />
        ))}
      </Menu>
    </div>
  );
}
