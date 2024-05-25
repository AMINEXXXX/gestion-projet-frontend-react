import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";

export default function AddProduct() {
  const { project } = useSelector((state) => state.project);
  const mutation = useCreateProductBacklog();
  const [isAdding, setIsAdding] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const btnName = "Add product";

  const HandleCreate = (e) => {
    e.preventDefault();
    if (!productName.trim() || !description.trim()) return;

    const product = {
      name: productName,
      description: description,
      project: {
        id: project.id,
      },
    };

    mutation.mutate(product);
    setIsAdding(false);
    setProductName("");
    setDescription("");

    console.log("Done !!!");
  };

  return (
    <Box>
      {!isAdding ? (
        <Box
          onClick={() => setIsAdding(true)}
          sx={{
            border: "1px solid #80cbc4",
            borderRadius: 1,
            padding: "50px",
            cursor: "pointer",
            width: "250px",
            color: "#00897b",
            fontWeight: "600",
            display: "flex",
            "&:hover": { bgcolor: "#b2dfdb44" },
            transition: ".15s ease-in",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <AddRoundedIcon sx={{ mr: 2 }} />
            {btnName}
          </Box>
        </Box>
      ) : (
        <form onSubmit={(e) => HandleCreate(e)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #b2dfdb77",
              borderRadius: 4,
              padding: 2,
              width: "250px",
              bgcolor: "white",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                autoFocus
                size="small"
                label="Nom"
                required
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                multiline
                rows={3}
                size="small"
                label="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", mt: 1, gap: 1.5 }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => HandleCreate(e)}
              >
                Ajouter
              </Button>
              <IconButton onClick={() => setIsAdding(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}
