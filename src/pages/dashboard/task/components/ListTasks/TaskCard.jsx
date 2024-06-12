import { CloseRounded } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import {
  useCreateTask,
  useUpdateTask,
} from "../../../../../hooks/api/useTaskApi";
import TaskSubCard from "./TaskSubCard";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

export default function TaskCard({ story, isSprint = false }) {
  const user = useSelector((state) => state.authentication.user);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const updateStory = useUpdateUserStory();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  function handleUpdateStoryName(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditing(false);
    const newStory = {
      id: story.id,
      name: newName?.charAt(0).toUpperCase() + newName?.slice(1),
    };
    setNewName("");
    updateStory.mutate(newStory);
  }

  function handleCreateTask(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    const newTask = {
      name: newName?.charAt(0).toUpperCase() + newName?.slice(1),
      userStory: {
        id: story.id,
      },
    };

    setNewName("");
    createTask.mutate(newTask);
  }
  function handleDrop(e) {
    if (!user.role.includes("PROJECT_MANAGER")) return;

    const updatedTask = {
      id: e.dataTransfer.getData("taskId"),
      userStory: {
        id: story.id,
      },
    };

    updateTask.mutate(updatedTask);
  }

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{
        border: "1px solid #ddd",
        borderRadius: "15px",
        px: 2,
        width: "370px",
        bgcolor: grey[50],
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 2.5,
        }}
      >
        {!isSprint && (
          <Box
            onClick={() => (
              setNewName(story.name),
              user.role.includes("PROJECT_MANAGER") ? setIsEditing(true) : null
            )}
            sx={{
              cursor: user.role.includes("PROJECT_MANAGER") ? "pointer" : "",
              marginBottom: 1,
              height: "50px",
              width: "100%",
            }}
          >
            {!isEditing ? (
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, padding: "10px 25px", color: "#333" }}
              >
                {story.name}
              </Typography>
            ) : (
              <form onSubmit={handleUpdateStoryName}>
                <input
                  autoFocus
                  value={newName}
                  onBlur={handleUpdateStoryName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    width: "100%",
                    outline: "none",
                    color: "#333",
                    border: "3px solid #009688",
                    fontSize: "24px",
                    padding: "5px 23px",
                    margin: "6px 0px",
                    borderRadius: "5px",
                  }}
                />
              </form>
            )}
          </Box>
        )}

        <Divider sx={{mb: 2}} />

        {story.tasks?.map((task, index) => {
          return <TaskSubCard key={index} story={story} task={task} />;
        })}

        {!isSprint && user.role.includes("PROJECT_MANAGER") && (
          <Box display="flex" height={"65px"}>
            {!isAdding ? (
              <Button
                sx={{
                  borderRadius: 2,
                  mb: 1.5,
                  mt: 1,
                  "&:hover": { bgcolor: "#b2dfdb77" },
                }}
                onClick={() => setIsAdding(true)}
              >
                <Box display="flex" gap={1}>
                  <AddIcon />
                  <Typography>Ajouter un task</Typography>
                </Box>
              </Button>
            ) : (
              <form
                onKeyDown={(e) => {
                  if (e.keyCode === 27) setIsAdding(false);
                }}
                onSubmit={handleCreateTask}
                style={{
                  display: "flex",
                  gap: 5,
                  width: "100%",
                  margin: "13px 0",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  label="Nom"
                  error={isError}
                  autoFocus
                  value={newName}
                  onBlur={() => (setIsError(false), setIsAdding(false))}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <IconButton>
                  <CloseRounded />
                </IconButton>
              </form>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
