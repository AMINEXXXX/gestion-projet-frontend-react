import React from "react";
import AddSprint from "./AddSprint/AddSprint";
import { Box, Typography } from "@mui/material";
import useAllSprint from "./ListSprint/useAllSprint";
import ListSprints from "./ListSprint/ListSprints";

export default function SprintBacklog() {
  useAllSprint();
  return (
    <>
      <Box mx={2}>
        <Box>
          <Typography variant="h4" mb={10}>Sprint Backlogs</Typography>
          <AddSprint />
        </Box>
        <Box py={10} width={"120vw"}>
          <ListSprints />
        </Box>
      </Box>
    </>
  );
}
