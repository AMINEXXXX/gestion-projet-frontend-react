import React from "react";
import useAllProducts from "../../../productBacklog/components/useAllProducts";
import useAllStories from "../../../userStory/components/useAllStories";
import useGetAll from "./useGetAll";
import { useGetAllUserStoryById } from "../../../../../hooks/api/useUserStoryApi";
import { useGetAllTask } from "../../../../../hooks/api/useTaskApi";

export default function useAllTasks() {
  let tasksData = [];
  const { productsData } = useAllProducts();

  productsData?.forEach((product) => {
    const { data } = useGetAllUserStoryById(product.id);
    data?.forEach((story) => {
      const { data } = useGetAllTask(story.id);
      tasksData.push({ id: story.id, name: story.name, tasks: data });
    });
  });


  return { tasksData };
}
