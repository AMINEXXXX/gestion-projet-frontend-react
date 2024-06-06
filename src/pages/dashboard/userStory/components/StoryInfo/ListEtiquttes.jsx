import { Box } from "@mui/material";
import React from "react";
import Etiquette from "./Etiquette";
import FadeMenuEtiquette from "./FadeMenuEtiquette";

export default function ListEtiquttes({ story, etiquettes, isUpdate }) {
  return (
    <Box display={"flex"} flexDirection={"row"} gap={0.5}>
      {!isUpdate ? (
        <Box display={"flex"} gap={1} flexWrap={"wrap"}>
          {etiquettes?.map((e, i) => (
            <Etiquette key={i} etiquette={e} />
          ))}
        </Box>
      ) : (
        <Box display={"flex"} flexWrap={"wrap"}>
          {etiquettes?.map((e, i) => (
            <Box m={0.5} key={i}>
              <FadeMenuEtiquette
                story={story}
                etiquette={e}
                isUpdate={true}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
