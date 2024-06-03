import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteTask from "../DeleteTask";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";
import TaskInfo from "../TaskInfo/TaskInfo";
import ListEtiquttes from "../TaskInfo/ListEtiquttes";

export default function TaskSubCard({ story, task }) {
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
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
      sx={{ mb: 1 }}
    >
      <CardHeader
        avatar={<TaskInfo story={story} task={task} />}
        title={
          !isEditingName ? (
            <>
              <ListEtiquttes etiquettes={task?.etiquettes} />
              <Typography
                noWrap
                onClick={() => setIsEditingName(true)}
                sx={{ fontSize: 19, width: "100%" }}
              >
                {task.name}
              </Typography>
            </>
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
        action={<DeleteTask task={task} />}
      />
    </Card>
  );
}
