import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useCreateUserStory } from "../../../../hooks/api/useUserStoryApi";
import useAllProducts from "../../productBacklog/components/useAllProducts";

export default function AddProduct() {
  const mutation = useCreateUserStory();
  const { productsData } = useAllProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [storyName, setStoryName] = useState("");
  const [productId, setProductId] = useState(null);
  const btnName = "Add story";

  const HandleCreate = (e) => {
    e.preventDefault();
    if (!storyName.trim() || productId == null){
      alert("Please 3mr kulchi !");  
      return;
    }

    const story = {
      name: storyName,
      productBacklog: {
        id: productId,
      },
    };

    mutation.mutate(story);
    setStoryName("");
    setProductId(null);

  };

  return (
    <Box>
      {!isAdding ? (
        <Box
          onClick={() =>
            productsData.length == 0
              ? alert("U can't add stories while there is no product !!!")
              : setIsAdding(true)
          }
          sx={{
            border: "1px solid #80cbc4",
            borderRadius: 1,
            padding: "50px",
            mb: 8,
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
              mb: 1.3,
              width: "250px",
              bgcolor: "white",
            }}
          >
            <TextField
              fullWidth
              autoFocus
              size="small"
              label="Nom"
              value={storyName}
              required
              onChange={(e) => setStoryName(e.target.value)}
            />
            <FormControl sx={{ my: 1 }} size="small">
              <InputLabel id="demo-select-small-label">Product</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={productId}
                label="Product"
                fullWidth
                required
                onChange={(e) => setProductId(e.target.value)}
              >
                {productsData?.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", mt: 1, gap: 1.5 }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => HandleCreate(e)}
              >
                Ajouter
              </Button>
              <IconButton
                onClick={() => (
                  setIsAdding(false), setProductId(null), setStoryName("")
                )}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}
