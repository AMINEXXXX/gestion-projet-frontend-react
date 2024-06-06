import React from "react";
import TaskSubCard from "../../../task/components/ListTasks/TaskSubCard";
import { useSelector } from "react-redux";

export default function TaskCard({ sprint, story, title, isFilter = false }) {
  const user = useSelector((state) => state.authentication.user);

  return story?.tasks?.map((task, index) =>
    !isFilter
      ? title == task?.state && (
          <TaskSubCard
            key={index}
            sprint={sprint}
            story={story}
            task={task}
            title={title}
            isSprint={true}
          />
        )
      : title == task?.state &&
        user.id == task?.teamMember?.id && (
          <TaskSubCard
            key={index}
            sprint={sprint}
            story={story}
            task={task}
            title={title}
            isSprint={true}
          />
        )
  );
}
