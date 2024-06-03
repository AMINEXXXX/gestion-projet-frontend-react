import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { AddOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCreateTask } from "../../../../../hooks/api/useTaskApi";

export default function FadeMenuAddTask({ story }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const createTask = useCreateTask();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setName("");
    setAnchorEl(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;

    const task = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      userStory: {
        id: story.id,
      },
    };
    setName("");
    createTask.mutate(task);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="inherit"
        sx={{ "&:hover": { bgcolor: "#BBB" }, width: "100%" }}
      >
        <AddOutlined sx={{ mr: 1, fontSize: "17.5px" }} />
        <Typography variant="p">Ajouter un task</Typography>
      </Button>
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
        <Box
          pt={0.5}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={1}
          width={"100%"}
        >
          <Typography fontWeight={600}>Ajouter un Task</Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ position: "absolute", right: 5 }}
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <Box px={2} mb={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              label="nom"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </Box>
      </Menu>
    </div>
  );
}
