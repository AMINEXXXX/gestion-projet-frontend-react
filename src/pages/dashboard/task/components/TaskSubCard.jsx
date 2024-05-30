import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import DeleteTask from "./DeleteTask";

export default function TaskSubCard({ task }) {
  return (
    <Card
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
      sx={{ mb: 1 }}
    >
      <CardHeader
        avatar={
          <Avatar variant="rounded" sx={{ fontWeight: 700 }}>
            <Typography variant="h5" fontWeight={700}>
              {task?.name?.charAt(0)}
            </Typography>
          </Avatar>
        }
        title={
          <Typography sx={{ fontSize: 19, width: "100%" }}>
            {task.name}
          </Typography>
        }
        action={<DeleteTask task={task} />}
      />
    </Card>
  );
}
