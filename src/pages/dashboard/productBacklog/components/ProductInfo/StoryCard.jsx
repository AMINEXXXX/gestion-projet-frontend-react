import { Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import { MoreVertOutlined } from "@mui/icons-material";
import FadeMenuStoryOption from "./FadeMenuStoryOption";

export default function StoryCard({ story }) {
  const [isEditingStoryName, setIsEditingStoryName] = useState(false);
  const [newName, setNewName] = useState(story.name);
  const mutation = useUpdateUserStory();

  function HandleSubmitOrBlur(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingStoryName(false);

    const newStory = {
      id: story.id,
      name: newName?.charAt(0).toUpperCase() + newName?.slice(1),
    };

    mutation.mutate(newStory);
  }

  return (
    <Card key={story.id} sx={{  width: "60%", my: 1, ml: 5, borderRadius: 3 }}>
      <Box pl={2} display={"flex"} gap={.5} alignItems={"center"}>
        {!isEditingStoryName ? (
          <Typography
            noWrap
            onClick={() => setIsEditingStoryName(true)}
            sx={{
              fontSize: 19,
              cursor: "pointer",
              width: "100%",
              height: "30px",
              ml: 0.24,
            }}
          >
            {story?.name?.charAt(0).toUpperCase() + story?.name?.slice(1)}
          </Typography>
        ) : (
          <form
            onSubmit={(e) => HandleSubmitOrBlur(e)}
            style={{ height: "30px", width: "100%" }}
          >
            <input
              autoFocus
              onBlur={(e) => HandleSubmitOrBlur(e)}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                fontSize: 19.5,
                width: "100%",
                border: "2px solid #009688",
                outline: "none",
                borderRadius: 5,
                padding: "2px 0px",
              }}
            />
          </form>
        )}
        <FadeMenuStoryOption story={story} />
      </Box>
    </Card>
  );
}
