import React from "react";
import useAllProducts from "../../productBacklog/components/useAllProducts";
import useAllStories from "../../userStory/components/useAllStories";
import Masonry from "react-masonry-css";
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";

export default function useAllTasks() {
  let data = [];
  const { productsData } = useAllProducts();

  productsData?.forEach((product) => {
    const { storiesData } = useAllStories(product.id);
    storiesData?.map((story) => {
      data.push({ id: story.id, name: story.name, tasks: story.tasks });
    });
  });

  console.log(data);

  return { data };
}
