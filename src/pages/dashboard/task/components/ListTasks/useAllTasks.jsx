import React from "react";
import useAllProducts from "../../../productBacklog/components/useAllProducts";
import useAllStories from "../../../userStory/components/useAllStories";
import useGetAll from "./useGetAll";

export default function useAllTasks() {
  let data = [];
  const { productsData } = useAllProducts();

  productsData?.forEach((product) => {
    const { storiesData } = useAllStories(product.id);
    storiesData?.map((story) => {
      const { tasksData } = useGetAll(story.id);
      data.push({ id: story.id, name: story.name, tasks: tasksData });
    });
  });


  return { data };
}
