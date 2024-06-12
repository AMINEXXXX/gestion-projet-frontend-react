import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Avatar,
  Button,
  Tooltip,
  TextField,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FadeMenuEtiquette from "./FadeMenuEtiquette";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ListEtiquttes from "./ListEtiquttes";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import FadeMenuAddTask from "./FadeMenuAddTask";
import { DeleteForever, FormatListBulletedOutlined } from "@mui/icons-material";
import useGetAll from "../../../task/components/ListTasks/useGetAll";
import TaskCard from "./TaskCard";
import { useDeleteAllTasks } from "../../../../../hooks/api/useTaskApi";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function StoryInfo({ product, story }) {
  const user = useSelector((state) => state.authentication.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newName, setNewName] = useState(story.name);
  const [newDescription, setNewDescription] = useState(story.description);
  const mutationStory = useUpdateUserStory();
  const mutationTasks = useDeleteAllTasks();
  const { tasksData } = useGetAll(story.id);

  function handleAction(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newStory = {
      id: story.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
    };

    mutationStory.mutate(newStory);
  }

  function handleUpdateDescription(e) {
    e.preventDefault();
    if (!newDescription.trim()) return;

    setIsEditingDescription(false);

    const newStory = {
      id: story.id,
      description: newDescription,
    };

    mutationStory.mutate(newStory);
  }

  return (
    <>
      <Avatar
        variant="rounded"
        sx={{ fontWeight: "700", cursor: "pointer" }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <Typography variant="h5" fontWeight={700}>
          {story.name?.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box bgcolor={grey[100]} height={"1000%"}>
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
                    onClick={() =>
                      user.role.includes("PROJECT_MANAGER")
                        ? setIsEditingName(true)
                        : null
                    }
                  >
                    {story.name}
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
                onClick={() => (
                  setIsDrawerOpen(false), setIsEditingName(false)
                )}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Typography pl={5}>
              Dans la liste de <u>{product?.name}</u>
            </Typography>
          </Box>
          <Grid container px={1}>
            <Grid
              item
              xs={user.role.includes("PROJECT_MANAGER") ? 9 : 12}
              pl={5}
            >
              <Box mt={2} width={"450px"}>
                {story?.etiquettes.length != 0 && (
                  <>
                    <Typography sx={{ fontSize: ".9rem", fontWeight: 700 }}>
                      Etiquettes
                    </Typography>
                    <ListEtiquttes
                      story={story}
                      etiquettes={story?.etiquettes}
                      isUpdate={true}
                    />
                  </>
                )}
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={2}
                height={"40px"}
                width={"100%"}
                pr={1}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <SubjectRoundedIcon
                    sx={{ fontSize: "2rem" }}
                    color="primary"
                  />
                  <Typography variant="h6">Description</Typography>
                </Box>
                {!isEditingDescription
                  ? user.role.includes("PROJECT_MANAGER") && (
                      <Button
                        variant="contained"
                        onClick={() => setIsEditingDescription(true)}
                      >
                        <EditOutlinedIcon sx={{ mr: 1, fontSize: "17.5px" }} />
                        Modifier
                      </Button>
                    )
                  : null}
              </Box>
              <Box px={5} width={"450px"}>
                {!isEditingDescription ? (
                  <Typography
                    width={"100%"}
                    onClick={() =>
                      user.role.includes("PROJECT_MANAGER")
                        ? setIsEditingDescription(true)
                        : null
                    }
                  >
                    {story.description}
                  </Typography>
                ) : (
                  <Box>
                    <TextField
                      multiline
                      autoFocus
                      value={newDescription}
                      sx={{
                        width: "100%",
                        fontSize: "1rem",
                        bgcolor: "#FFF",
                      }}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <Box mt={1.5} display={"flex"} gap={1}>
                      <Button
                        variant="contained"
                        onClick={handleUpdateDescription}
                      >
                        Sauvgarder
                      </Button>
                      <Button
                        color="inherit"
                        // sx={{ "&:hover": { bgcolor: "#b2dfdb55" } }}
                        onClick={() => setIsEditingDescription(false)}
                      >
                        Annuler
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box mt={2} pr={2}>
                {tasksData?.length != 0 && (
                  <>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={1.2}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={1.2}>
                        <FormatListBulletedOutlined
                          sx={{ ml: 0.5, fontSize: "1.5rem" }}
                          color="primary"
                        />
                        <Typography variant="h5">Tasks</Typography>
                      </Box>
                      {user.role.includes("PROJECT_MANAGER") && (
                        <Tooltip title="Supprimer tous les tasks">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => mutationTasks.mutate(tasksData)}
                          >
                            <DeleteForever />
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                    <Box>
                      {tasksData?.map((task, index) => (
                        <TaskCard
                          key={index}
                          productId={product.id}
                          task={task}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
            {user.role.includes("PROJECT_MANAGER") && (
              <Grid item xs={3}>
                <FadeMenuEtiquette story={story} />
                <FadeMenuAddTask story={story} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
