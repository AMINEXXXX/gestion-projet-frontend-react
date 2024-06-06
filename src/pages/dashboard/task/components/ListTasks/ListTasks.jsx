import React from "react";
import useAllTasks from "./useAllTasks";
import Masonry from "react-masonry-css";
import TaskCard from "./TaskCard";

export default function ListTasks() {
  // const { data } = useGetProductBacklogById(project.id);
  // const { productsData } = useAllProducts();
  const { data } = useAllTasks();


  return (
    // <Container sx={{ display: "flex", gap: 3 }}>
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data?.map((story, index) => (
        <TaskCard key={index} story={story} />
      ))}
    </Masonry>
    // </Container>
  );
}
