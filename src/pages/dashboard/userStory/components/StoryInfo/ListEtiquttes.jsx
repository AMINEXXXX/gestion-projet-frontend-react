import { Box } from "@mui/material";
import React from "react";
import Etiquette from "./Etiquette";

export default function ListEtiquttes({ story, etiquettes, isInfo }) {
  return (
    <Box display={"flex"} flexDirection={"row"} gap={0.5}>
      {etiquettes?.map((e, i) => (
        <Etiquette key={i} story={story} etiquette={e} isInfo={isInfo} />
      ))}
    </Box>
  );
}
