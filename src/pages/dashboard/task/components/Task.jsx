import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AddTask from "./AddTask";
import ListTasks from "./ListTasks/ListTasks";
import { useSelector } from "react-redux";

export default function Task() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" mb={user.role.includes("PROJECT_MANAGER") ? 5 : 12}>
          Tasks
        </Typography>
        {user.role.includes("PROJECT_MANAGER") && (
          <Box mt={5}>
            <AddTask />
          </Box>
        )}
      </Box>
      <ListTasks />
    </Container>
  );
}
