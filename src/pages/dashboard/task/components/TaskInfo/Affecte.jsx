import { Avatar, Box, Card, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useUpdateTask } from "../../../../../hooks/api/useTaskApi";

export default function Affecte({ task, member, handleClose }) {
  const mutationTask = useUpdateTask();

  function handleAffecte(e) {
    e.preventDefault();
    const newTeamMember = {
      id: task?.id,
      teamMember: {
        id: member?.id,
      },
    };
    handleClose();
    mutationTask.mutate(newTeamMember);
  }
  return (
    <MenuItem
      onClick={handleAffecte}
      sx={[
        {
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
        },
      ]}
    >
      <Avatar>{member?.fullName?.slice(0, 2)}</Avatar>
      <Typography>{member?.fullName}</Typography>
    </MenuItem>
  );
}
