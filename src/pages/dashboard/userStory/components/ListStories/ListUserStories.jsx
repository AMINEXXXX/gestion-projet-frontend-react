import React from "react";
import { Box, Container } from "@mui/material";
import UserStoryCard from "./UserStoryCard";
import { useSelector } from "react-redux";
import { useGetProductBacklogById } from "../../../../../hooks/api/useProductBacklogApi";
import Masonry from "react-masonry-css";

export default function ListUserStories() {
  const { project } = useSelector((state) => state.project);
  const { data } = useGetProductBacklogById(project.id);

  return (
    // <Container sx={{ display: "flex", gap: 3 }}>
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data?.map((product, index) => (
        <Box key={index}>
          <UserStoryCard product={product} />
        </Box>
      ))}
    </Masonry>
    // </Container>
  );
}
