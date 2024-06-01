import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDeleteStoryEtiquette } from "../../../../../hooks/api/useUserStoryApi";
import { motion } from "framer-motion";
import { grey, red } from "@mui/material/colors";

export default function Etiquette({ etiquette, isInfo = false }) {
  const [open, setOpen] = useState(isInfo);
  const mutation = useDeleteStoryEtiquette();

  return (
    <Box
      component={motion.div}
      initial={{ height: !isInfo ? "10px" : "40px" }}
      animate={{ height: open ? (!isInfo ? "20px" : "40px") : "10px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      width={open ? null : "35px"}
      // height={isInfo ? "50px" : null}
      borderRadius={1.5}
      bgcolor={etiquette.color}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={".9rem"}
      color={"#FFF"}
      sx={{ cursor: isInfo ? null : "pointer" }}
      onClick={() => !isInfo && setOpen(!open)}
    >
      {open ? (
        <Typography px={1} py={5} sx={{color: etiquette?.color?.charAt(1).charCodeAt(0) <= 100 ? "#FFF" : "#000"}}>
          {etiquette.description}
        </Typography>
      ) : null}
      {isInfo ? (
        <IconButton
          sx={{ color: etiquette?.color?.charAt(1).charCodeAt(0) <= 100 ? "#FFF" : "#000" }}
          size="small"
          onClick={() => mutation.mutate(etiquette.id)}
        >
          <CloseOutlined />
        </IconButton>
      ) : null}
    </Box>
  );
}
