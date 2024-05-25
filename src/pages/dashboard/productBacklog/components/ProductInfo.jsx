import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { red } from "@mui/material/colors";
import { useUpdateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";

export default function ProductInfo({ product }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(product.name);
  const mutation = useUpdateProductBacklog();

  function handleAction(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newProduct = {
      id: product.id,
      name: newName,
    };

    mutation.mutate(newProduct);
  }

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <RemoveRedEyeOutlinedIcon color="primary" />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="300px" textAlign="center">
          <IconButton
            onClick={() => (setIsDrawerOpen(false), setIsEditingName(false))}
          >
            <CloseOutlinedIcon />
          </IconButton>
          {!isEditingName ? (
            <Typography variant="h4" onClick={() => setIsEditingName(true)}>
              {product.name}
            </Typography>
          ) : (
            <form onSubmit={handleAction}>
              <input
                autoFocus
                onBlur={handleAction}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </form>
          )}
        </Box>
      </Drawer>
    </>
  );
}
