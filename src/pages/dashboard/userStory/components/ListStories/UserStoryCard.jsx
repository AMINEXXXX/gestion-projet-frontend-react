import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import UserStorySubCard from "./UserStorySubCard";
import Masonry from "react-masonry-css";
import useAllStories from "../useAllStories";
import { useUpdateProductBacklog } from "../../../../../hooks/api/useProductBacklogApi";
import AddIcon from "@mui/icons-material/Add";
import {
  useCreateUserStory,
  useUpdateUserStory,
} from "../../../../../hooks/api/useUserStoryApi";
import { CloseRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

export default function UserStoryCard({ product }) {
  const user = useSelector((state) => state.authentication.user);
  const { storiesData } = useAllStories(product.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newName, setNewName] = useState("");
  const mutationProduct = useUpdateProductBacklog();
  const mutationStory = useCreateUserStory();
  const mutationUpdateStory = useUpdateUserStory();

  function handleCreate(e) {
    e.preventDefault();
    setIsError(false);
    if (!newName.trim()) {
      setIsError(true);
      return;
    }

    // setIsAdding(false);
    const newStory = {
      name: newName?.charAt(0).toUpperCase() + newName?.slice(1),
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
      name: newName?.charAt(0).toUpperCase() + newName?.slice(1),
    };
    setNewName("");
    mutationProduct.mutate(newProduct);
  }
  function handleDrop(e) {
    if(!user.role.includes("PROJECT_MANAGER")) return;
    const updateStory = {
      id: e.dataTransfer.getData("id"),
      productBacklog: {
        id: product.id,
      },
    };

    mutationUpdateStory.mutate(updateStory);
  }

  return storiesData?.length >= 0 ? (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{
        border: "1px solid #ddd",
        borderRadius: "15px",
        px: 2,
        width: "370px",
        bgcolor: grey[50],
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
          onClick={() => (
            setNewName(product.name),
            user.role.includes("PROJECT_MANAGER") ? setIsEditing(true) : null
          )}
          style={{
            cursor: user.role.includes("PROJECT_MANAGER") ? "pointer" : "",
            marginBottom: 10,
            height: "50px",
          }}
        >
          {!isEditing ? (
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, padding: "10px 25px", color: "#333" }}
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
                  width: "100%",
                  outline: "none",
                  color: "#333",
                  border: "3px solid #009688",
                  fontSize: "24px",
                  padding: "5px 23px",
                  margin: "6px 0px",
                  borderRadius: "5px",
                }}
              />
            </form>
          )}
        </div>
        <Divider sx={{ mb: 5 }} />
        <Masonry
          breakpointCols={1}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {storiesData?.map((story, index) => (
            <UserStorySubCard key={index} product={product} story={story} />
          ))}
        </Masonry>
        {user.role.includes("PROJECT_MANAGER") && (
          <Box display="flex" height={"35px"}>
            {!isAdding ? (
              <Button
                sx={{
                  borderRadius: 2,
                  mb: 1.5,
                  mt: -2,
                  "&:hover": { bgcolor: "#b2dfdb77" },
                }}
                onClick={() => setIsAdding(true)}
              >
                <Box display="flex" alignItems={"center"} gap={1}>
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
                  width: "100%",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  label="Nom"
                  error={isError}
                  autoFocus
                  value={newName}
                  onBlur={() => (setIsError(false), setIsAdding(false))}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <IconButton>
                  <CloseRounded />
                </IconButton>
              </form>
            )}
          </Box>
        )}
      </Box>
    </Box>
  ) : null;
}
