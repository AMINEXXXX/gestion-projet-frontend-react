import { Card, CardHeader, Divider } from "@mui/material";
import React from "react";
import TaskCard from "./TaskCard";
import { grey } from "@mui/material/colors";
import { useUpdateSprintBacklog } from "../../../../../hooks/api/useSprintBacklogApi";

export default function SprintCard({ sprint, title, isFilter = false }) {
  const updateSprint = useUpdateSprintBacklog();

  const handleDrop = (e) => {
    const updatedSprint = {
      id: e.dataTransfer.getData("sprintId"),
      userStories: [
        {
          id: e.dataTransfer.getData("storyId"),
          tasks: [
            {
              id: e.dataTransfer.getData("taskId"),
              state: title,
              valid: title == "Done" ? false : null,
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
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{ width: "350px", bgcolor: grey[50], p: 1, px: 2, borderRadius: 5 }}
    >
      <CardHeader title={title} />
      <Divider sx={{ mb: 2 }} />
      {sprint?.userStories?.map((story) => {
        return (
          <TaskCard
            key={story?.id}
            sprint={sprint}
            story={story}
            title={title}
            isFilter={isFilter}
          />
        );
      })}
    </Card>
  );
}
