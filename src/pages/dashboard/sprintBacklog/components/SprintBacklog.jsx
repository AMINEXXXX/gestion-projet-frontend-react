import React from "react";
import AddSprint from "./AddSprint/AddSprint";
import { Box, Typography } from "@mui/material";
import useAllSprint from "./ListSprint/useAllSprint";
import ListSprints from "./ListSprint/ListSprints";
import { useSelector } from "react-redux";

export default function SprintBacklog() {
  const user = useSelector((state) => state.authentication.user);

  return (
    <>
      <Box mx={0}>
        <Box>
          <Typography variant="h4" mb={10}>
            Sprint Backlogs
          </Typography>
          {user.role[0] == "PROJECT_MANAGER" && <AddSprint />}
        </Box>
        <Box py={10} width={"100%"}>
          <ListSprints />
        </Box>
      </Box>
    </>
  );
}
