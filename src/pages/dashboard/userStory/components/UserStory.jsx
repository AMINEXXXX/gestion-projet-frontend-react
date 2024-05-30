import React from "react";
import AddStory from "./AddStory";
import { Box, Container, Typography } from "@mui/material";
import ListUserStories from "./ListStories/ListUserStories";

export default function UserStory() {
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" mb={5}>
          User Stories
        </Typography>
        <Box mt={5}>
          <AddStory />
        </Box>
      </Box>
      <ListUserStories />
    </Container>
  );
}
