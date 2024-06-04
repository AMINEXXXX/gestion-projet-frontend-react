import React from "react";
import AddSprint from "./AddSprint/AddSprint";
import { Box, Container, Typography } from "@mui/material";
import useAllSprint from "./ListSprint/useAllSprint";
import ListSprints from "./ListSprint/ListSprints";

export default function SprintBacklog() {
  useAllSprint();
  return (
    <>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4">Sprint Backlogs</Typography>
          <Box
            height={"120px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box />
            <AddSprint />
          </Box>
        </Box>
        <ListSprints />
      </Container>
    </>
  );
}
