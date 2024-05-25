import React from "react";
import AddStory from "./AddStory";
import ListUserStories from "./ListUserStories";
import { Box } from "@mui/material";

export default function UserStory() {
  return (
    <Box>
      <AddStory />
      <ListUserStories />
    </Box>
  );
}
