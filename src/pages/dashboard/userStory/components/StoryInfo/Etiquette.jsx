import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDeleteStoryEtiquette } from "../../../../../hooks/api/useUserStoryApi";
import { motion } from "framer-motion";

export default function Etiquette({ story, etiquette, isInfo = false }) {
  const [open, setOpen] = useState(isInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(etiquette?.description)
  const mutation = useDeleteStoryEtiquette();

  const handleUpdate = (event) => {
    event.preventDefault();
    if(!description.trim()) return;
    
    setIsEditing(false);
    const updatedEtiquette = {
      id: etiquette.id,

    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ height: !isInfo ? "10px" : "40px" }}
      animate={{ height: open ? (!isInfo ? "20px" : "40px") : "10px" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      width={open ? null : "35px"}
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
        !isEditing ? (
          <Typography
            px={1}
            py={5}
            sx={{
              color:
                etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                  ? "#FFF"
                  : "#000",
            }}
            onClick={() => (isInfo ? setIsEditing(true) : null)}
          >
            {etiquette.description.charAt(0).toUpperCase() +
              etiquette.description.slice(1)}
          </Typography>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              autoFocus
              onBlur={handleUpdate}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100px",
                backgroundColor: etiquette.color,
                paddingLeft: 10,
                outline: "none",
                border: "none",
                color:
                  etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                    ? "#FFF"
                    : "#000",
                    fontSize: "1rem"
              }}
            />
          </form>
        )
      ) : null}
      {isInfo ? (
        <IconButton
          sx={{
            color:
              etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                ? "#FFF"
                : "#000",
          }}
          size="small"
          onClick={() => mutation.mutate(etiquette.id)}
        >
          <CloseOutlined sx={{ fontSize: 20 }} />
        </IconButton>
      ) : null}
    </Box>
  );
}
