import React from "react";
import { Box, Typography } from "@mui/material";
import SprintCard from "./SprintCard";
import useAllSprint from "./useAllSprint";
import UpdateSprint from "../AddSprint/UpdateSprint";

export default function ListSprints() {
  const titles = ["Todo", "Doing", "Done", "Test", "Problem"];
  const { sprintsData } = useAllSprint();

  return (
    <>
      {sprintsData?.map((sprint, index) => (
        <>
          <Typography key={index} variant="h4" display={"flex"} gap={2} alignItems={"center"}>
            {`Sprint ${++index} : `} <UpdateSprint data={sprint} title={sprint?.name} />
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
            {titles?.map((title, index) => (
              <SprintCard key={index} title={title} />
            ))}
          </Box>
        </>
      ))}
    </>
  );
}
