import React from "react";
import { Box } from "@mui/material";
import SprintCard from "./SprintCard";

export default function ListSprints() {
  const titles = ["Todo", "Doing", "Done", "Test", "Problem"];

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mt: 5, flexWrap: "wrap" }}>
        {titles?.map((title, index) => (
          <SprintCard key={index} title={title} />
        ))}
      </Box>
    </>
  );
}
