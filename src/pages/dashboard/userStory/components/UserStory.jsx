import React from "react";
import AddStory from "./AddStory";
import { Box, Container, Typography } from "@mui/material";
import ListUserStories from "./ListStories/ListUserStories";
import { useSelector } from "react-redux";

export default function UserStory() {
  const user = useSelector((state) => state.authentication.user);
  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" mb={user.role[0] != "SUPER_ADMIN" ? 5 : 10}>
          User Stories
        </Typography>
        {!user.role.includes("SUPER_ADMIN") && (
          <Box mt={5}>
            <AddStory />
          </Box>
        )}
      </Box>
      <ListUserStories />
    </Container>
  );
}
