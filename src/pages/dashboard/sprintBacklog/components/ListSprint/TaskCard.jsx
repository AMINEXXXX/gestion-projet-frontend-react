import React from "react";
import TaskSubCard from "../../../task/components/ListTasks/TaskSubCard";

export default function TaskCard({ story, title }) {
  return story?.tasks?.map((task, index) => (
    title == task?.state &&<TaskSubCard
      key={index}
      story={story}
      task={task}
      title={title}
      isSprint={true}
    />
  ));
}
