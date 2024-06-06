import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteStory from "../MoreOption/DeleteStory";
import StoryInfo from "../StoryInfo/StoryInfo";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import ListEtiquttes from "../StoryInfo/ListEtiquttes";

export default function userStorySubCard({ product, story }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(story.name);
  const mutation = useUpdateUserStory();

  function HandleSubmitOrBlur(e) {
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newStory = {
      id: story.id,
      name: newName,
    };

    mutation.mutate(newStory);
  }

  return (
    <Card
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", story.id)}
      sx={{ width: "100%", marginTop: -3, borderRadius: 4 }}
    >
      <CardHeader
        sx={{ "&:hover": { bgcolor: "#eee" }, borderRadius: 1 }}
        avatar={<StoryInfo product={product} story={story} />}
        action={
          <Tooltip title="Delete">
            <DeleteStory story={story} />
          </Tooltip>
        }
        title={
          !isEditingName ? (
            <>
              <ListEtiquttes etiquettes={story?.etiquettes} />
              <Typography
                noWrap
                onClick={() => setIsEditingName(true)}
                sx={{ fontSize: 19, width: "100%" }}
              >
                {story?.name?.charAt(0).toUpperCase() + story?.name?.slice(1)}
              </Typography>
            </>
          ) : (
            <form onSubmit={(e) => HandleSubmitOrBlur(e)}>
              <input
                autoFocus
                onBlur={(e) => HandleSubmitOrBlur(e)}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  fontSize: 19.5,
                  width: "100%",
                  border: "3px solid #009688",
                  outline: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                  padding: "6px 3.4px",
                  margin: ".5px -5px",
                }}
              />
            </form>
          )
        }
      />
    </Card>
  );
}
