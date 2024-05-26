import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton, TextField } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { red } from "@mui/material/colors";
import { useUpdateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";
import { useUpdateUserStory } from "../../../../hooks/api/useUserStoryApi";

export default function StoryInfo({ story }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(story.name);
  const mutation = useUpdateUserStory();

  function handleAction(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newStory = {
      id: story.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
    };

    console.log(newName.charAt(0).toUpperCase() + newName.slice(1));
    mutation.mutate(newStory);
  }

  return (
    <>
      {/* <Box onClick={() => setIsDrawerOpen(true)}>
        <RemoveRedEyeOutlinedIcon color="primary" />
      </Box> */}
      <Typography
        variant="h5"
        fontWeight={700}
        onClick={() => setIsDrawerOpen(true)}
      >
        {story.name?.charAt(0).toUpperCase()}
      </Typography>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            onClick={() => (setIsDrawerOpen(false), setIsEditingName(false))}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Box p={2} width="500px" display="flex" alignItems="center">
          {!isEditingName ? (
            <Typography
              variant="h4"
              padding={0.5}
              pl={0.6}
              width="100%"
              sx={{cursor: "pointer"}}
              onClick={() => setIsEditingName(true)}
            >
              {story.name}
            </Typography>
          ) : (
            <form onSubmit={handleAction}>
              <input
                style={{
                  width: "100%",
                  fontSize: "34.6px",
                  fontWeight: 500,
                  padding: 2,
                  outline: "none",
                  // border: "3px solid #009688",
                  border: "3px solid",
                  borderRadius: "5px",
                }}
                autoFocus
                onBlur={handleAction}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </form>
          )}
        </Box>
      </Drawer>
    </>
  );
}
