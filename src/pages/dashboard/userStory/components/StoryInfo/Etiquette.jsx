import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDeleteStoryEtiquette } from "../../../../../hooks/api/useUserStoryApi";
import { motion } from "framer-motion";

export default function Etiquette({ etiquette }) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteStoryEtiquette();

  return (
    <Box
      component={motion.div}
      initial={{ height: "10px" }}
      animate={{ height: open ? "20px" : "10px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
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
      {open ? <Typography px={1}>{etiquette.description}</Typography> : null}
    </Box>
  );
}
