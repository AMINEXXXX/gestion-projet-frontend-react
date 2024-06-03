import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Fade from "@mui/material/Fade";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import ColorPicker from "./ColorPicker";
import {
  useCreateTaskEtiquette,
  useDeleteTaskEtiquette,
  useUpdateTaskEtiquette,
} from "../../../../../hooks/api/useTaskApi";

export default function FadeMenuEtiquette({
  task,
  etiquette,
  isUpdate = false,
}) {
  const mutationCreateEtiquette = useCreateTaskEtiquette();
  const mutationUpdateEtiquette = useUpdateTaskEtiquette();
  const mutationDeleteEtiquette = useDeleteTaskEtiquette();
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

    const taskEtiquette = {
      color: color,
      description: description,
      task: {
        id: task.id,
      },
    };

    console.log(taskEtiquette);
    mutationCreateEtiquette.mutate(taskEtiquette);
  };

  const handleUpdateStoryEtiquette = (event) => {
    event.preventDefault();
    if (!description.trim()) {
      console.log("error");
      return;
    }

    const taskEtiquette = {
      id: etiquette.id,
      color: color,
      description: description,
      task: {
        id: task.id,
      },
    };

    handleClose();
    console.log(taskEtiquette);
    mutationUpdateEtiquette.mutate(taskEtiquette);
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
        <Button
          p={0.5}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderRadius: 2,
            bgcolor: etiquette.color,
            "&:hover": { bgcolor: etiquette.color },
          }}
        >
          <Typography
            onClick={handleClick}
            sx={{
              color:
                etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                  ? "#FFF"
                  : "#000",
            }}
          >
            {etiquette.description.charAt(0).toUpperCase() +
              etiquette.description.slice(1)}
          </Typography>
          <IconButton
            sx={{
              color:
                etiquette?.color?.charAt(1).charCodeAt(0) <= 100
                  ? "#FFF"
                  : "#000",
            }}
            size="small"
            onClick={() => mutationDeleteEtiquette.mutate(etiquette.id)}
          >
            <CloseOutlined sx={{ fontSize: 20 }} />
          </IconButton>
        </Button>
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
