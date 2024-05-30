import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDeleteStoryEtiquette } from "../../../../../hooks/api/useUserStoryApi";

export default function Etiquette({ etiquette }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteStoryEtiquette();

  return (
    <Box
      height={open ? "20px" : "10px"}
      width={open ? null : "35px"}
      borderRadius={1.5}
      bgcolor={etiquette.color}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={".9rem"}
      color={"#FFF"}
      sx={{ cursor: "pointer" }}
      onClick={() => setOpen(!open)}
    >
      {open ? (
        <Typography display={"flex"} gap={1} alignItems={"center"}>
          {etiquette.description}{" "}
          <CloseOutlined
            fontSize="inherit"
            onClick={() => mutation.mutate(etiquette.id)}
          />
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
}
