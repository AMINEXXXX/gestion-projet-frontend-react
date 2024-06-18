import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteTask from "../DeleteTask";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";
import TaskInfo from "../TaskInfo/TaskInfo";
import ListEtiquttes from "../TaskInfo/ListEtiquttes";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import useAllCommentaire from "../commentaire/useAllCommentaire";
import { useSelector } from "react-redux";
import { Done } from "@mui/icons-material";
import { Task } from "@mui/icons-material";
import { WarningRounded } from "@mui/icons-material";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { useUpdateSprintBacklog } from "../../../../../hooks/api/useSprintBacklogApi";
import { red } from "@mui/material/colors";

export default function TaskSubCard({
  sprint,
  story,
  task,
  title,
  isSprint = false,
}) {
  const user = useSelector((state) => state.authentication.user);
  const { commentaireData } = useAllCommentaire(task?.id);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const updateSprint = useUpdateSprintBacklog();
  const mutation = useUpdateTask();


  function HandleSubmitOrBlur(e) {
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newTask = {
      id: task.id,
      name: newName,
    };

    mutation.mutate(newTask);
  }
  const handleValider = (e) => {
    const updatedSprint = {
      id: sprint?.id,
      userStories: [
        {
          id: story?.id,
          tasks: [
            {
              id: task?.id,
              state: "Done",
              valid: true,
            },
          ],
        },
      ],
    };

    console.log(updatedSprint);
    updateSprint.mutate(updatedSprint);
  };
  const handleInvalider = (e) => {
    const updatedSprint = {
      id: sprint?.id,
      userStories: [
        {
          id: story?.id,
          tasks: [
            {
              id: task?.id,
              state: "Doing",
              valid: null,
            },
          ],
        },
      ],
    };

    console.log(updatedSprint);
    updateSprint.mutate(updatedSprint);
  };

  return (
    <Card
      draggable={
        (user.role.includes("PROJECT_MANAGER") && isSprint == false) ||
        task?.teamMember?.id == user?.id
      }
      onDragStart={(e) => (
        e.dataTransfer.setData("sprintId", sprint?.id),
        e.dataTransfer.setData("storyId", story?.id),
        e.dataTransfer.setData("taskId", task?.id),
        e.dataTransfer.setData("teamMemberId", task?.teamMember?.id),
        e.dataTransfer.setData("taskState", task?.state)
      )}
      sx={{
        mb: 1,
        borderRadius: 4,
        "&:hover": { bgcolor: "#eee" },
        transition: ".3s ease",
      }}
    >
      <CardHeader
        avatar={<TaskInfo story={story} task={task} sprint={sprint} isSprint={isSprint} />}
        title={
          !isEditingName ? (
            <Box position={"relative"}>
              <ListEtiquttes
                etiquettes={task?.etiquettes}
                isSprint={isSprint}
                sprint={sprint}
                story={story}
              />
              <Typography
                noWrap
                onClick={() =>
                  !isSprint && user.role.includes("PROJECT_MANAGER")
                    ? setIsEditingName(true)
                    : setIsEditingName(false)
                }
                sx={{ fontSize: 19, width: "100%" }}
              >
                {task.name}
              </Typography>

              {isSprint &&
                task?.valid == false &&
                user.role[0] == "PROJECT_MANAGER" && (
                  <>
                    <Tooltip title="Validez la tache">
                      <IconButton size="small" onClick={handleValider}>
                        <Done color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Invalidez la tache">
                      <IconButton size="small" onClick={handleInvalider}>
                        <CloseOutlined color="error" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}

              {isSprint && task?.valid == true && (
                <Task
                  sx={{ position: "absolute", bottom: 0, right: 35 }}
                  color="primary"
                />
              )}

              {isSprint && title == "Problem" && (
                <WarningRounded
                  sx={{ position: "absolute", bottom: 0, right: 35 }}
                  color="error"
                />
              )}

              {commentaireData?.length != 0 && (
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  position={"absolute"}
                  bottom={0}
                  right={0}
                >
                  <ChatBubbleOutlineOutlined
                    color="primary"
                    sx={{ fontSize: "1.2rem", mr: 0.2 }}
                  />
                  <Typography>{commentaireData?.length}</Typography>
                </Box>
              )}
            </Box>
          ) : (
            <form onSubmit={(e) => HandleSubmitOrBlur(e)}>
              <input
                autoFocus
                onBlur={(e) => HandleSubmitOrBlur(e)}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  fontSize: 19.5,
                  width: "100%",
                  border: "3px solid #009688",
                  outline: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  padding: "6px 2.5px",
                  margin: ".5px -5px",
                }}
              />
            </form>
          )
        }
        action={
          !isSprint &&
          user.role.includes("PROJECT_MANAGER") && <DeleteTask task={task} />
        }
      />
    </Card>
  );
}
