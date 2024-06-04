import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import useAllSprint from "./useAllSprint";
import TaskCard from "./TaskCard";
import { grey } from "@mui/material/colors";

export default function SprintCard({ title }) {
  const { sprintsData } = useAllSprint();

  return (
    <Card
      sx={{ width: "350px", bgcolor: grey[50], p: 1, px: 2, borderRadius: 5 }}
    >
      <CardHeader title={title} />
      {sprintsData?.map((sprint) =>
        sprint?.userStories?.map((story) => {
          return <TaskCard key={story?.id} story={story} title={title} />;
        })
      )}
    </Card>
  );
}
