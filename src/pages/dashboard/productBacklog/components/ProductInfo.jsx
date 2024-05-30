import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Modal,
  Grid,
  Card,
  Tooltip,
  CardHeader,
  Avatar,
  CardContent,
} from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import { useUpdateProductBacklog } from "../../../../hooks/api/useProductBacklogApi";
import useAllStories from "../../userStory/components/useAllStories";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DeleteStory from "../../userStory/components/MoreOption/DeleteStory";
import StoryCard from "./StoryCard";
import {
  useCreateUserStory,
  useDeleteAllUserStory,
} from "../../../../hooks/api/useUserStoryApi";

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
        <RemoveRedEyeOutlinedIcon color="primary" />
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
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
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
              <Box display={"flex"} alignItems={"center"} gap={1} width={"100%"}>
              <Inventory2OutlinedIcon color="primary" />
                {!isEditingProductName ? (
                  <Typography
                    variant="h4"
                    padding={0.5}
                    pl={0.6}
                    width="100%"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsEditingProductName(true)}
                  >
                    {product.name}
                  </Typography>
                ) : (
                  <form onSubmit={handleUpdateName}>
                    <input
                      style={{
                        width: "100%",
                        fontSize: "34.6px",
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
          <Grid container gap={2} pl={4} pr={haveStories ? 10 : 0}>
            <Grid item xs={!haveStories ? 8.7 : 12}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={2}
                height={"40px"}
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
              {haveStories ? (
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
                    <Button
                      variant="contained"
                      onClick={() => (
                        mutationAllstories.mutate(storiesData),
                        setHaveStories(false)
                      )}
                    >
                      Supprimer
                    </Button>
                  </Box>
                  <Box>
                    {storiesData?.map((story) => (
                      <StoryCard story={story} />
                    ))}
                  </Box>
                  <Box width={"100%"} px={6}>
                    {!isAddingStory ? (
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => setIsAddingStory(true)}
                      >
                        Ajouter une story
                      </Button>
                    ) : (
                      <form onSubmit={handleCreateStory}>
                        <TextField
                          fullWidth
                          size="small"
                          autoFocus
                          placeholder="Ajouter une story"
                          value={storyName}
                          sx={{ mt: 1 }}
                          onChange={(e) => setStoryName(e.target.value)}
                        />
                        <Box display={"flex"} gap={1} mt={1}>
                          <Button
                            variant="contained"
                            onClick={handleCreateStory}
                          >
                            Ajouter
                          </Button>
                          <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => setIsAddingStory(false)}
                          >
                            Annuler
                          </Button>
                        </Box>
                      </form>
                    )}
                  </Box>
                </>
              ) : (
                <Typography mt={25} ml={8} variant="h4">
                  Ajouter des user stories ...!
                </Typography>
              )}
            </Grid>
            {!haveStories && (
              <Grid item xs={3} px={3}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setHaveStories(true)}
                >
                  Add Stories
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Drawer>
      {/* <Dialog
        open={isDrawerOpen}
        fullWidth
        maxWidth="md"
        onClose={() => setIsDrawerOpen(false)}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box height={"100vh"}>
          <DialogTitle id="scroll-dialog-title">
            <Box
              sx={{
                // width: "600px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <Box width={"100%"} height={"50px"}>
                {!isEditingProductName ? (
                  <Typography
                    variant="h4"
                    padding={0.5}
                    pl={0.6}
                    width="100%"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsEditingProductName(true)}
                  >
                    {product.name}
                  </Typography>
                ) : (
                  <form onSubmit={handleUpdateName}>
                    <input
                      style={{
                        width: "100%",
                        fontSize: "34.6px",
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
              <IconButton
                size="large"
                onClick={() => (
                  setIsDrawerOpen(false), setIsEditingProductName(false)
                )}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                marginBottom={2}
                height={"40px"}
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
                      style={{ width: "100%", fontSize: "1rem" }}
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
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog> */}
      {/*<Modal
        scroll="body"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            minHeight: "87vh",
            // bgcolor: "background.paper",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Box sx={{ p: 1, pl: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 5,
                marginBottom: 5,
              }}
            >
              <Box width={"100%"} height={"50px"}>
                {!isEditingProductName ? (
                  <Typography
                    variant="h4"
                    padding={0.5}
                    pl={0.6}
                    width="100%"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsEditingProductName(true)}
                  >
                    {product.name}
                  </Typography>
                ) : (
                  <form onSubmit={handleUpdateName}>
                    <input
                      style={{
                        width: "100%",
                        fontSize: "34.6px",
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
              <IconButton
                onClick={() => (
                  setIsDrawerOpen(false), setIsEditingName(false)
                )}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
            <Grid container gap={2}>
              <Grid item xs={8.7}>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  marginBottom={2}
                  height={"40px"}
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
                {product?.userStories?.length != 0 ? (
                  <>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={1.2}
                      mt={3}
                    >
                      <FormatListBulletedOutlinedIcon
                        sx={{ ml: 0.5, fontSize: "1.5rem" }}
                        color="primary"
                      />
                      <Typography variant="h6">User Stories</Typography>
                    </Box>
                    <Box>
                      {storiesData?.map((story) => (
                        <StoryCard story={story} />
                      ))}
                    </Box>
                  </>
                ) : (
                  <Typography mt={15} ml={8} variant="h4">
                    Ajouter des user stories ...!
                  </Typography>
                )}
              </Grid>
              <Grid item xs={3} px={3}>
                {product?.userStories?.length == 0 && (
                  <Button variant="contained" fullWidth>
                    Add Stories
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal> */}
    </>
  );
}
