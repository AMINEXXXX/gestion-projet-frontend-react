import React from "react";
import ListCardsSection from "./ListCardsSection";
import CircularWithValueLabel from "./CircularProgress";
import { Box, Container } from "@mui/material";
import WeeksRemaining from "./WeeksRemaining";

export default function Progress({ project }) {

  return (
    <Container>
      <WeeksRemaining project={project} />
      <ListCardsSection />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 5
        }}
      >
        <CircularWithValueLabel />
      </Box>
    </Container>
  );
}
