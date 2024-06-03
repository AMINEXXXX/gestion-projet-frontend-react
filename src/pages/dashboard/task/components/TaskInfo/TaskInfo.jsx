import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Avatar,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";
import FadeMenuEtiquette from "./FadeMenuEtiquette";
import ListEtiquttes from "./ListEtiquttes";

export default function TaskInfo({ story, task }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const mutationTask = useUpdateTask();

  function handleAction(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newTask = {
      id: task.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
    };

    mutationStory.mutate(newTask);
  }

  return (
    <>
      <Avatar
        variant="rounded"
        sx={{ fontWeight: "700", cursor: "pointer" }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <Typography variant="h5" fontWeight={700}>
          {task.name?.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: "700px", p: 1, pl: 2 }}>
          <Box
            width="100%"
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box
              height={"50px"}
              display={"flex"}
              gap={1}
              alignItems={"center"}
              width={"100%"}
            >
              <Inventory2OutlinedIcon color="primary" />
              {!isEditingName ? (
                <Typography
                  variant="h4"
                  pl={1}
                  width="100%"
                  fontSize={"2rem"}
                  onClick={() => setIsEditingName(true)}
                >
                  {task.name}
                </Typography>
              ) : (
                <form onSubmit={handleAction} style={{ width: "100%" }}>
                  <input
                    style={{
                      width: "100%",
                      fontSize: "2rem",
                      fontWeight: 500,
                      padding: 5,
                      outline: "none",
                      border: "3px solid #009688",
                      // border: "3px solid",
                      borderRadius: "5px",
                    }}
                    autoFocus
                    onBlur={handleAction}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </form>
              )}
            </Box>
            <IconButton
              sx={{ float: "right" }}
              onClick={() => (setIsDrawerOpen(false), setIsEditingName(false))}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Typography pl={5}>
            Dans la liste de <u>{story?.name}</u>
          </Typography>
        </Box>
        <Grid container px={1}>
          <Grid item xs={9} pl={5}>
            <Box mt={2} width={"450px"}>
              {task?.etiquettes?.length != 0 && (
                <>
                  <Typography sx={{ fontSize: ".9rem", fontWeight: 700 }}>
                    Etiquettes
                  </Typography>
                  <ListEtiquttes
                    task={task}
                    etiquettes={task?.etiquettes}
                    isUpdate={true}
                  />
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <FadeMenuEtiquette task={task} />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
