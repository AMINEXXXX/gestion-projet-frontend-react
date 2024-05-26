import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import UserStorySubCard from "./userStorySubCard";
import Masonry from "react-masonry-css";
import useAllStories from "./useAllStories";
import { useUpdateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";
import AddIcon from "@mui/icons-material/Add";
import { useCreateUserStory } from "../../../../hooks/api/useUserStoryApi";
import { CloseRounded } from "@mui/icons-material";

export default function UserStoryCard({ product }) {
  const { storiesData } = useAllStories(product.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newName, setNewName] = useState("");
  const mutationProduct = useUpdateProductBacklog();
  const mutationStory = useCreateUserStory();

  function handleCreate(e) {
    e.preventDefault();
    setIsError(false);
    if (!newName.trim()) {
      setIsError(true);
      return;
    }

    setIsAdding(false);
    const newStory = {
      name: newName,
      productBacklog: {
        id: product.id,
      },
    };

    setNewName("");
    mutationStory.mutate(newStory);
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditing(false);
    const newProduct = {
      id: product.id,
      name: newName,
    };
    setNewName("");
    mutationProduct.mutate(newProduct);
  }

  return storiesData?.length != 0 ? (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: "15px",
        px: 4,
        bgcolor: "#FFF",
        width: "300px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: 2.5,
        }}
      >
        <div
          onClick={() => (setNewName(product.name), setIsEditing(true))}
          style={{ cursor: "pointer", marginBottom: 30 }}
        >
          {!isEditing ? (
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, padding: "10px 25px", color: "#555" }}
            >
              {product.name}
            </Typography>
          ) : (
            <form onSubmit={handleUpdate}>
              <input
                autoFocus
                value={newName}
                onBlur={handleUpdate}
                onChange={(e) => setNewName(e.target.value)}
                style={{
                  width: "250px",
                  fontSize: "24px",
                  padding: "5px 23px",
                  margin: "6px 0px",
                  borderRadius: "5px",
                }}
              />
            </form>
          )}
        </div>

        <Masonry
          breakpointCols={1}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          style={{}}
        >
          {storiesData?.map((story, index) => (
            <UserStorySubCard key={index} story={story} />
          ))}
        </Masonry>
        <Box display="flex" mx="auto">
          {!isAdding ? (
            <Button
              variant="contained"
              sx={{ mb: 1.5, mt: -2 }}
              onClick={() => setIsAdding(true)}
            >
              <Box display="flex" gap={1}>
                <AddIcon />
                <Typography>Ajouter une user story</Typography>
              </Box>
            </Button>
          ) : (
            <form
              onKeyDown={(e) => {
                if (e.keyCode === 27) setIsAdding(false);
              }}
              onSubmit={handleCreate}
              style={{
                display: "flex",
                gap: 5,
                marginTop: -15,
                marginBottom: 13,
              }}
            >
              <TextField
                size="small"
                label="Nom"
                error={isError}
                autoFocus
                onBlur={() => (setIsError(false), setIsAdding(false))}
                onChange={(e) => setNewName(e.target.value)}
              />
              <IconButton>
                <CloseRounded />
              </IconButton>
            </form>
          )}
        </Box>
      </Box>
    </Box>
  ) : null;
}
