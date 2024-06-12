import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Fade from "@mui/material/Fade";
import { Box, Chip, Divider, IconButton, TextField, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import ColorPicker from "./ColorPicker";
import {
  useCreateStoryEtiquette,
  useDeleteStoryEtiquette,
  useUpdateStoryEtiquette,
  useUpdateUserStory,
} from "../../../../../hooks/api/useUserStoryApi";
import { useSelector } from "react-redux";

export default function FadeMenuEtiquette({
  story,
  etiquette,
  isUpdate = false,
}) {
  const user = useSelector((state) => state.authentication.user);
  const mutationCreateEtiquette = useCreateStoryEtiquette();
  const mutationUpdateEtiquette = useUpdateStoryEtiquette();
  const mutationDeleteEtiquette = useDeleteStoryEtiquette();
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState(isUpdate ? etiquette.color : "#eee");
  const [description, setDescription] = useState(
    isUpdate ? etiquette.description : ""
  );
  const [isError, setIsError] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    if (!isUpdate) {
      setColor("#eee");
      setDescription("");
    }
    setAnchorEl(null);
  };
  const handleCreateStoryEtiquette = (event) => {
    event.preventDefault();
    if (!description.trim()) {
      console.log("error");
      return;
    }

    setColor("#eee");
    setDescription("");

    const storyEtiquette = {
      color: color,
      description: description,
      userStory: {
        id: story.id,
      },
    };

    console.log(storyEtiquette);
    mutationCreateEtiquette.mutate(storyEtiquette);
  };

  const handleUpdateStoryEtiquette = (event) => {
    event.preventDefault();
    if (!description.trim()) {
      console.log("error");
      return;
    }

    const storyEtiquette = {
      id: etiquette.id,
      color: color,
      description: description,
      userStory: {
        id: story.id,
      },
    };

    handleClose();
    console.log(storyEtiquette);
    mutationUpdateEtiquette.mutate(storyEtiquette);
  };

  return (
    <div>
      {!isUpdate ? (
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="inherit"
          variant="contained"
          sx={{ "&:hover": { bgcolor: "#BBB" }, width: "100%", mb: 1 }}
        >
          <SellOutlinedIcon
            sx={{ transform: "rotate(-90deg)", mr: 1, fontSize: "17.5px" }}
          />
          Etiquettes
        </Button>
      ) : (
        // <Button
        //   p={0.5}
        //   sx={{
        //     display: "flex",
        //     alignItems: "center",
        //     gap: 1,
        //     borderRadius: 2,
        //     bgcolor: etiquette.color,
        //     "&:hover": { bgcolor: etiquette.color },
        //   }}
        // >
        //   <Typography
        //     onClick={handleClick}
        //     sx={{
        //       color:
        //         etiquette?.color?.charAt(1).charCodeAt(0) <= 100
        //           ? "#FFF"
        //           : "#000",
        //     }}
        //   >
        //     {etiquette.description.charAt(0).toUpperCase() +
        //       etiquette.description.slice(1)}
        //   </Typography>
        //   <IconButton
        //     sx={{
        //       color:
        //         etiquette?.color?.charAt(1).charCodeAt(0) <= 100
        //           ? "#FFF"
        //           : "#000",
        //     }}
        //     size="small"
        //     onClick={() => mutationDeleteEtiquette.mutate(etiquette.id)}
        //   >
        //     <CloseOutlined sx={{ fontSize: 20 }} />
        //   </IconButton>
        // </Button>
        <Chip
          sx={{
            bgcolor: etiquette.color,
            color:
              etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                ? "#FFF"
                : "#000",
            "&:hover": { bgcolor: etiquette.color },
          }}
          label={
            etiquette.description.charAt(0).toUpperCase() +
            etiquette.description.slice(1)
          }
          onClick={ user.role[0] != "SUPER_ADMIN" ? handleClick : null}
          onDelete={() => (user.role[0] != "SUPER_ADMIN" ? mutationDeleteEtiquette.mutate(etiquette.id) : null)}
        />
      )}
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
          <form
            onSubmit={
              !isUpdate
                ? handleCreateStoryEtiquette
                : handleUpdateStoryEtiquette
            }
            style={{ width: "100%" }}
          >
            <TextField
              size="small"
              color={isError ? "error" : "primary"}
              value={description}
              autoFocus
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
            {!isUpdate ? (
              <Button
                variant="contained"
                sx={{ width: "70px" }}
                onClick={handleCreateStoryEtiquette}
              >
                Ajouter
              </Button>
            ) : (
              <Button variant="contained" onClick={handleUpdateStoryEtiquette}>
                Enregistrer
              </Button>
            )}

            <Button variant="contained" color="error" onClick={handleClose}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Menu>
    </div>
  );
}
