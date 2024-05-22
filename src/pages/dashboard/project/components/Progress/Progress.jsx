import React from "react";
import ListCardsSection from "./ListCardsSection";
import CircularWithValueLabel from "./CircularProgress";
import { Box } from "@mui/material";

export default function Progress() {
  return (
    <>
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
    </>
  );
}
