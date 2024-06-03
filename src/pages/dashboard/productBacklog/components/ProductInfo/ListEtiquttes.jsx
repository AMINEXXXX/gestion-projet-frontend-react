import { Box } from "@mui/material";
import React from "react";
import Etiquette from "./Etiquette";
import FadeMenuEtiquette from "./FadeMenuEtiquette"

export default function ListEtiquttes({ product, etiquettes, isUpdate }) {
  return (
    <Box display={"flex"} flexDirection={"row"} gap={0.5}>
      {!isUpdate ? (
        etiquettes?.map((e, i) => (
          <Etiquette key={i} product={product} etiquette={e} isInfo={isUpdate} />
        ))
      ) : (
        <Box display={"flex"} flexWrap={"wrap"}>
          {etiquettes?.map((e, i) => (
            <Box m={.5}>
              <FadeMenuEtiquette
                key={i}
                product={product}
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
