import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Avatar,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useUpdateUserStory } from "../../../../../hooks/api/useUserStoryApi";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FadeMenuEtiquette from "./FadeMenuEtiquette";
import ListEtiquettes from "./ListEtiquttes";
import ListEtiquttes from "./ListEtiquttes";

export default function StoryInfo({ product, story }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(story.name);
  const mutation = useUpdateUserStory();

  console.log(story);

  function handleAction(e) {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsEditingName(false);

    const newStory = {
      id: story.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
    };

    console.log(newName.charAt(0).toUpperCase() + newName.slice(1));
    mutation.mutate(newStory);
  }

  return (
    <>
      <Avatar
        variant="rounded"
        sx={{ fontWeight: "700", cursor: "pointer" }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <Typography variant="h5" fontWeight={700}>
          {story.name?.charAt(0).toUpperCase()}
        </Typography>
      </Avatar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ p: 1, pl: 2 }}>
          <Box
            width="650px"
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Box
              height={"50px"}
              display={"flex"}
              gap={1}
              alignItems={"center"}
              width={"100%"}
            >
              <Inventory2OutlinedIcon color="primary" />
              {!isEditingName ? (
                <Typography
                  variant="h4"
                  padding={0.5}
                  pl={0.6}
                  width="100%"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setIsEditingName(true)}
                >
                  {story.name}
                </Typography>
              ) : (
                <form onSubmit={handleAction} style={{ width: "100%" }}>
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
                    onBlur={handleAction}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </form>
              )}
            </Box>
            <IconButton
              sx={{ float: "right" }}
              onClick={() => (setIsDrawerOpen(false), setIsEditingName(false))}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
          <Typography pl={5}>
            Dans la liste de <u>{product?.name}</u>
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={9} pl={5}>
            <Box>
              {story?.etiquettes?.length > 0 && (
                <>
                  <Typography sx={{ fontSize: ".9rem", fontWeight: 700 }}>
                    Etiquettes
                  </Typography>
                  <ListEtiquttes etiquettes={story?.etiquettes} isInfo={true} />
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <FadeMenuEtiquette story={story} />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
