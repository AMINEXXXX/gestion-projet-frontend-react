import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDeleteStoryEtiquette } from "../../../../../hooks/api/useUserStoryApi";
import { motion } from "framer-motion";

export default function Etiquette({ etiquette }) {
  const [open, setOpen] = useState(false);

  

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
      {open ? (
        <Typography
          px={1}
          py={5}
          sx={{
            color:
              etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                ? "#FFF"
                : "#000",
          }}
        >
          {etiquette.description.charAt(0).toUpperCase() +
            etiquette.description.slice(1)}
        </Typography>
      ) : null}
    </Box>
  );
}
