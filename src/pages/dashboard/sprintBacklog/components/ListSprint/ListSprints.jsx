import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import SprintCard from "./SprintCard";
import useAllSprint from "./useAllSprint";
import UpdateSprint from "../AddSprint/UpdateSprint";
import { useSelector } from "react-redux";

export default function ListSprints() {
  const titles = ["Todo", "Doing", "Done", "Test", "Problem"];
  const [isFilter, setIsFilter] = useState(false);
  const user = useSelector((state) => state.authentication.user);
  const { sprintsData } = useAllSprint();

  return sprintsData?.map((sprint, index) => (
    <Box key={index}>
      <Box mb={7} display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h4" display={"flex"} gap={2} alignItems={"center"}>
          {`Sprint ${index + 1} : `}
          <UpdateSprint data={sprint} title={sprint?.name} />
        </Typography>
      </Box>
      {index == 0 && user?.role[0] == "TEAM_MEMBER" && (
        <FormControlLabel
          sx={{ ml: 5 }}
          control={<Checkbox onClick={() => setIsFilter(!isFilter)} />}
          label="Juste mes taches"
        />
      )}
      <Box sx={{ display: "flex", gap: 2, pb: 5 }}>
        {titles?.map((title, index) => (
          <SprintCard
            key={index}
            sprint={sprint}
            title={title}
            isFilter={isFilter}
          />
        ))}
      </Box>
    </Box>
  ));
}
