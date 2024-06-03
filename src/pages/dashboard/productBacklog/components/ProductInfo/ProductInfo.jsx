import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import { useUpdateProductBacklog } from "../../../../../hooks/api/useProductBacklogApi";
import useAllStories from "../../../userStory/components/useAllStories";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import StoryCard from "./StoryCard";
import {
  useCreateUserStory,
  useDeleteAllUserStory,
} from "../../../../../hooks/api/useUserStoryApi";
import FadeMenuAddStory from "./FadeMenuAddStory";
import { DeleteForever } from "@mui/icons-material";
import FadeMenuEtiquette from "./FadeMenuEtiquette";
import ListEtiquttes from "./ListEtiquttes";

export default function ProductInfo({ product }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [isEditingProductName, setIsEditingProductName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newProductName, setNewProductName] = useState(product.name);
  const [storyName, setStoryName] = useState("");
  const [newDescription, setNewDescription] = useState(product.description);
  const mutationProduct = useUpdateProductBacklog();
  const mutationStory = useCreateUserStory();
  const { storiesData } = useAllStories(product.id);
  const mutationAllstories = useDeleteAllUserStory();
  const [haveStories, setHaveStories] = useState(
    storiesData?.length == 0 ? false : true
  );

  function handleUpdateName(e) {
    e.preventDefault();
    if (!newProductName.trim()) return;

    setIsEditingProductName(false);

    const newProduct = {
      id: product.id,
      name: newProductName.charAt(0).toUpperCase() + newProductName.slice(1),
    };

    mutationProduct.mutate(newProduct);
  }
  function handleUpdateDescription(e) {
    e.preventDefault();
    if (!newDescription.trim()) return;

    setIsEditingDescription(false);

    const newProduct = {
      id: product.id,
      name: newProductName.charAt(0).toUpperCase() + newProductName.slice(1),
      description: newDescription,
    };

    mutationProduct.mutate(newProduct);
  }
  function handleCreateStory(e) {
    e.preventDefault();
    if (!storyName.trim()) return;

    const story = {
      name: storyName.charAt(0).toUpperCase() + storyName.slice(1),
      productBacklog: {
        id: product.id,
      },
    };

    setStoryName("");
    mutationStory.mutate(story);
  }

  return (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)}>
        <EditOutlinedIcon color="primary" />
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width={"700px"} sx={{ p: 1, pl: 2 }}>
          <Box
            sx={{
              display: "flex",
              marginBottom: 5,
            }}
          >
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              height={"50px"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={1}
                width={"100%"}
              >
                <Inventory2OutlinedIcon color="primary" />
                {!isEditingProductName ? (
                  <Typography
                    variant="h4"
                    padding={0.5}
                    pl={0.6}
                    width="100%"
                    fontSize={"2rem"}
                    onClick={() => setIsEditingProductName(true)}
                  >
                    {product.name}
                  </Typography>
                ) : (
                  <form style={{ width: "100%" }} onSubmit={handleUpdateName}>
                    <input
                      style={{
                        width: "100%",
                        fontSize: "2rem",
                        fontWeight: 500,
                        padding: 2,
                        outline: "none",
                        border: "3px solid #009688",
                        // border: "3px solid",
                        borderRadius: "5px",
                      }}
                      autoFocus
                      onBlur={handleUpdateName}
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                    />
                  </form>
                )}
              </Box>
              <Box>
                <IconButton
                  sx={{ float: "right" }}
                  onClick={() => (
                    setIsDrawerOpen(false), setIsEditingName(false)
                  )}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Grid container px={1}>
            <Grid item xs={9} pl={3}>
              <Box mb={2} width={"450px"}>
                {product?.etiquettes?.length != 0 && (
                  <>
                    <Typography sx={{ fontSize: ".9rem", fontWeight: 700 }}>
                      Etiquettes
                    </Typography>
                    <ListEtiquttes
                      product={product}
                      etiquettes={product?.etiquettes}
                      isUpdate={true}
                    />
                  </>
                )}
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={2}
                height={"40px"}
                width={"450px"}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <SubjectRoundedIcon
                    sx={{ fontSize: "2rem" }}
                    color="primary"
                  />
                  <Typography variant="h6">Description</Typography>
                </Box>
                {!isEditingDescription ? (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditingDescription(true)}
                  >
                    <EditOutlinedIcon sx={{ mr: 1, fontSize: "17.5px" }} />
                    Modifier
                  </Button>
                ) : null}
              </Box>
              <Box px={5}>
                {!isEditingDescription ? (
                  <Typography onClick={() => setIsEditingDescription(true)}>
                    {product.description}
                  </Typography>
                ) : (
                  <Box>
                    <TextField
                      multiline
                      autoFocus
                      value={newDescription}
                      sx={{
                        width: "100%",
                        fontSize: "1rem",
                        bgcolor: "#FFF",
                      }}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <Box mt={1.5} display={"flex"} gap={1}>
                      <Button
                        variant="contained"
                        onClick={handleUpdateDescription}
                      >
                        Sauvgarder
                      </Button>
                      <Button
                        sx={{ "&:hover": { bgcolor: "#b2dfdb55" } }}
                        onClick={() => setIsEditingDescription(false)}
                      >
                        Annuler
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
              {storiesData?.length != 0 && (
                <>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    height={"40px"}
                    mt={2}
                  >
                    <Box display={"flex"} alignItems={"center"} gap={1.2}>
                      <FormatListBulletedOutlinedIcon
                        sx={{ ml: 0.5, fontSize: "1.5rem" }}
                        color="primary"
                      />
                      <Typography variant="h6">User Stories</Typography>
                    </Box>
                    <Tooltip title="Supprimer tous les user stories">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => mutationAllstories.mutate(storiesData)}
                      >
                        <DeleteForever />
                      </Button>
                    </Tooltip>
                  </Box>
                  <Box>
                    {storiesData?.map((story) => (
                      <StoryCard story={story} />
                    ))}
                  </Box>
                </>
              )}
            </Grid>
            <Grid item xs={3}>
              <FadeMenuEtiquette product={product} />
              <FadeMenuAddStory product={product} />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}
