import React from "react";
import AddStory from "./AddStory";
import ListUserStories from "./ListUserStories";
import { Box, Container, Typography } from "@mui/material";

export default function UserStory() {
  return (
    <Container>
      <Typography variant="h4" mb={5}>
        User Stories
      </Typography>
      <AddStory />
      <ListUserStories />
    </Container>
  );
}
