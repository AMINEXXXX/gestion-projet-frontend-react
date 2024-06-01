import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Fade from "@mui/material/Fade";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import ColorPicker from "./ColorPicker";
import {
  useCreateStoryEtiquette,
  useUpdateUserStory,
} from "../../../../../hooks/api/useUserStoryApi";

export default function FadeMenuEtiquette({ story, isUpdate = false }) {
  const mutation = useCreateStoryEtiquette();
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState("#eee");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [etiquette, setEtiquette] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setColor("#eee");
    setDescription("");
    setAnchorEl(null);
  };
  const handleUpdateStory = (event) => {
    event.preventDefault();
    if (!description.trim()) {
      console.log("error");
      return;
    }

    const storyEtiquette = {
      color: color,
      description: description,
      userStory: {
        id: story.id
      }
    };

    console.log(storyEtiquette);
    mutation.mutate(storyEtiquette);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
        variant="contained"
        sx={{ "&:hover": { bgcolor: "#BBB" } }}
      >
        <SellOutlinedIcon
          sx={{ transform: "rotate(-90deg)", mr: 1, fontSize: "17.5px" }}
        />
        Etiquettes
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          px={2}
          sx={{ position: "relative" }}
          width={"320px"}
        >
          <Box
            pt={0.5}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography fontWeight={600}>Ajouter une etiquette</Typography>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ position: "absolute", right: 7 }}
            >
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box p={2} mt={1} bgcolor={"#eee"}>
            <Box
              bgcolor={color}
              color={color.charAt(1).charCodeAt(0) <= 100 ? "#FFF" : "#000"}
              textAlign={"center"}
              p={1}
              py={description.trim() ? 1 : 2.5}
              borderRadius={2}
            >
              {description}
            </Box>
          </Box>
          <Typography fontWeight={600} fontSize={".9rem"}>
            Titre
          </Typography>
          <form onSubmit={handleUpdateStory} style={{ width: "100%" }}>
            <TextField
              size="small"
              color={isError ? "error" : "primary"}
              onChange={(e) => (
                !e.target.value.trim() ? setIsError(true) : setIsError(false),
                setDescription(e.target.value)
              )}
              sx={{ width: "100%" }}
            />
          </form>
          <Typography fontWeight={600} fontSize={".8rem"}>
            Sélectionnez une couleur
          </Typography>
          <ColorPicker setColor={setColor} />
          <Divider sx={{ my: 1 }} />
          <Box
            display={"flex"}
            justifyItems={"center"}
            justifyContent={"space-between"}
          >
            <Button
              variant="contained"
              sx={{ width: "70px" }}
              onClick={handleUpdateStory}
            >
              Ajouter
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ width: "70px" }}
              onClick={handleClose}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Menu>
    </div>
  );
}
