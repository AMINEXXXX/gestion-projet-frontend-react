import React from "react";
import useAllTasks from "./useAllTasks";
import Masonry from "react-masonry-css";
import TaskCard from "./TaskCard";

export default function ListTasks() {
  const { tasksData } = useAllTasks();


  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {tasksData?.map((story, index) => (
        <TaskCard key={index} story={story} />
      ))}
    </Masonry>
  );
}
