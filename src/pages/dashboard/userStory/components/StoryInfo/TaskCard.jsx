import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";
import FadeMenuTaskOption from "../../../task/components/FadeMenuTaskOption";
import { blue, orange, red, teal } from "@mui/material/colors";

export default function TaskCard({ productId, task }) {
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const mutation = useUpdateTask();

  function HandleSubmitOrBlur(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingTaskName(false);

    const newTask = {
      id: task.id,
      name: newName?.charAt(0).toUpperCase() + newName?.slice(1),
      state: task.state,
    };

    mutation.mutate(newTask);
  }

  return (
    <Card key={task.id} sx={{ width: "80%", my: 1, ml: 5, borderRadius: 3 }}>
      <Box
        pl={2}
        display={"flex"}
        gap={0.5}
        height={"50px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {!isEditingTaskName ? (
          <Box
            position={"relative"}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
          >
            <Typography
              noWrap
              onClick={() => setIsEditingTaskName(true)}
              sx={{
                fontSize: 19,
                cursor: "pointer",
                width: "100%",
                ml: 0.24,
              }}
            >
              {task?.name?.charAt(0).toUpperCase() + task?.name?.slice(1)}
            </Typography>
            <Typography
              fontSize={15}
              position={"absolute"}
              right={0}
              border={1}
              py={0.5}
              px={1}
              borderRadius={10}
              sx={
                task.state == "Todo"
                  ? { color: "#999" }
                  : task.state === "Doing"
                  ? { color: blue[500] }
                  : task.state === "Done"
                  ? { color: teal[500] }
                  : task.state === "Problem"
                  ? { color: red[900] }
                  : { color: orange[500] }
              }
            >
              {task.state}
            </Typography>
          </Box>
        ) : (
          <form
            onSubmit={(e) => HandleSubmitOrBlur(e)}
            style={{ width: "100%" }}
          >
            <input
              autoFocus
              onBlur={(e) => HandleSubmitOrBlur(e)}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                fontSize: 19.5,
                width: "100%",
                border: "2px solid #009688",
                outline: "none",
                borderRadius: 5,
                padding: "2px 0px",
              }}
            />
          </form>
        )}
        <FadeMenuTaskOption productId={productId} task={task} />
      </Box>
    </Card>
  );
}
