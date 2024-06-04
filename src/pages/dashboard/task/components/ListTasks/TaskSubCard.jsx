import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteTask from "../DeleteTask";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";
import TaskInfo from "../TaskInfo/TaskInfo";
import ListEtiquttes from "../TaskInfo/ListEtiquttes";
import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import useAllCommentaire from "../commentaire/useAllCommentaire";

export default function TaskSubCard({ story, task, isSprint = false }) {
  const { commentaireData } = useAllCommentaire(task?.id);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(task.name);
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

  return (
    <Card
      draggable={isSprint ? false : true}
      onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
      sx={{ mb: 1, borderRadius: 4 }}
    >
      <CardHeader
        avatar={<TaskInfo story={story} task={task} isSprint={isSprint} />}
        title={
          !isEditingName ? (
            <Box position={"relative"}>
              <ListEtiquttes etiquettes={task?.etiquettes} />
              <Typography
                noWrap
                onClick={() => !isSprint && setIsEditingName(true)}
                sx={{ fontSize: 19, width: "100%" }}
              >
                {task.name}
              </Typography>

              {commentaireData?.length != 0 && (
                <Box display={"flex"} alignItems={"center"} position={"absolute"} bottom={0} right={0}>
                  <ChatBubbleOutlineOutlined color="primary" sx={{ fontSize: "1.2rem" }} />
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
        action={!isSprint && <DeleteTask task={task} />}
      />
    </Card>
  );
}
