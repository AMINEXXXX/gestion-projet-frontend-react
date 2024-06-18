import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Alert,
  AlertTitle,
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
  const [storyDescription, setStoryDescription] = useState("");
  const [isErreur, setIsErreur] = useState(false);
  const [erreur, setErreur] = useState("");
  const [productId, setProductId] = useState(null);
  const btnName = "Ajouter user story";

  const HandleCreate = (e) => {
    e.preventDefault();
    if (!storyName.trim() || !storyDescription.trim() || productId == null) {
      setIsErreur(true);
      setErreur("Veuillez remplir tous les champ.");
      return;
    }

    const story = {
      name: storyName,
      description: storyDescription,
      productBacklog: {
        id: productId,
      },
    };

    mutation.mutate(story);
    setIsErreur(false);
    setStoryName("");
    setStoryDescription("");
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
            width: "300px",
            color: "#00897b",
            fontWeight: "600",
            display: "flex",
            "&:hover": { bgcolor: "#b2dfdb44" },
            // transition: ".15s ease-in",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <AddRoundedIcon sx={{ mr: 2 }} />
            {btnName}
          </Box>
        </Box>
      ) : (
        <form
          onKeyDown={(e) => {
            if (e.keyCode === 27) setIsAdding(false);
          }}
          onSubmit={(e) => HandleCreate(e)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #ddd", //#b2dfdb77
              borderRadius: 4,
              padding: 2,
              mb: 1.3,
              width: "350px",
              gap: 1,
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
            <TextField
              fullWidth
              multiline
              minRows={2}
              size="small"
              label="Description"
              value={storyDescription}
              required
              onChange={(e) => setStoryDescription(e.target.value)}
            />
            <FormControl size="small">
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
            {isErreur && (
              <Alert severity="error">
                <AlertTitle>Erreur</AlertTitle>
                {erreur}
              </Alert>
            )}
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
                  setIsAdding(false),
                  setProductId(null),
                  setStoryName(""),
                  setStoryDescription(""),
                  setIsErreur(false)
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
