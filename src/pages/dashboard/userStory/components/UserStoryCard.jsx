import React, { useState } from "react";
import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import UserStorySubCard from "./userStorySubCard";
import Masonry from "react-masonry-css";
import useAllStories from "./useAllStories";
import { useUpdateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";
import { grey } from "@mui/material/colors";

export default function UserStoryCard({ product }) {
  const { storiesData } = useAllStories(product.id);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(product.name);
  const mutation = useUpdateProductBacklog();

  
  console.log(product.name);

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(newName);
    if(!newName.trim()) return;
    const newProduct = {
      id: product.id,
      name: newName,
    }
    console.log(newProduct);
    mutation.mutate(newProduct);
    setIsEditing(false);
  };

  return (
    <>
      {storiesData?.length != 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            
          }}
        >
          <div onClick={() => setIsEditing(true)} style={{marginBottom: 30}}>
            {!isEditing ? (
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, padding: "10px 25px" }}
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
                  style={{width: "250px", padding: "5px 0"}}
                />
              </form>
            )}
          </div>

          <Masonry
            breakpointCols={1}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {storiesData?.map((story, index) => (
              <UserStorySubCard key={index} story={story} />
            ))}
          </Masonry>
        </Box>
      ) : null}
    </>
  );
}
