import React from "react";
import { Box, Container } from "@mui/material";
import UserStoryCard from "./UserStoryCard";
import { useSelector } from "react-redux";
import { useGetProductBacklogById } from "../../../../hooks/api/useProductBacklogApi";

export default function ListUserStories() {
  const { project } = useSelector((state) => state.project);
  const { data } = useGetProductBacklogById(project.id);
  
  

  return (
    <Container sx={{ display: "flex", gap: 5 }}>
      {data?.map((product, index) => (
        <UserStoryCard key={index} product={product} />
      ))}
    </Container>
  );
}
