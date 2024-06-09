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
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FadeMenuEtiquette from "./FadeMenuEtiquette";
import ListEtiquttes from "./ListEtiquttes";
import FadeMenuAddTask from "./FadeMenuAddTask";
import { DeleteForever, FormatListBulletedOutlined } from "@mui/icons-material";
import useGetAll from "../../../task/components/ListTasks/useGetAll";
import TaskCard from "./TaskCard";
import { useDeleteAllTasks } from "../../../../../hooks/api/useTaskApi";
import { grey } from "@mui/material/colors";

export default function StoryInfo({ product, story }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(story.name);
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
                    onClick={() => setIsEditingName(true)}
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
            <Grid item xs={9} pl={5}>
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
                      <Tooltip title="Supprimer tous les tasks">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => mutationTasks.mutate(tasksData)}
                        >
                          <DeleteForever />
                        </Button>
                      </Tooltip>
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
            <Grid item xs={3}>
              <FadeMenuEtiquette story={story} />
              <FadeMenuAddTask story={story} />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
