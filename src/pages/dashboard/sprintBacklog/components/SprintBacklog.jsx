import React from "react";
import AddSprint from "./AddSprint/AddSprint";
import { Box, Typography } from "@mui/material";
import useAllSprint from "./ListSprint/useAllSprint";
import ListSprints from "./ListSprint/ListSprints";
import { useSelector } from "react-redux";
import { ReactTyped } from "react-typed";

export default function SprintBacklog() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <>
      <Box mx={0}>
        <Box>
          <Typography variant="h4" mb={10}>
            Sprint Backlogs
          </Typography>
          {user.role.includes("PROJECT_MANAGER") && <AddSprint />}
        </Box>
        <Box
          py={user.role.includes("PROJECT_MANAGER") ? 10 : 0}
          width={"100%"}
        >
          <ListSprints />
        </Box>
      </Box>
    </>
  );
}
