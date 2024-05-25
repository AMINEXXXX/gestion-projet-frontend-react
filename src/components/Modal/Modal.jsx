import { useState } from "react";
import ModalContainer from "./ModalContainer";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export default function Modal(props) {
  const {
    btnName,
    btnVar = null,
    btnIcon = null,
    btnEvent = null,
    btnColor = null,
    children,
    modalTitle = "",
    modalCancelName = null,
    modalCancelEvent = null,
    modalActionName = null,
    modalActionEvent = null,
    modalFinalEvent = null,
    btnActionColor = null,
    actionType = null,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    modalCancelEvent && modalCancelEvent();
    setOpen(true);
  };
  const handleClose = () => {
    modalFinalEvent && modalFinalEvent();
    setOpen(false);
  };
  const handleCancel = () => {
    btnEvent && btnEvent();
    modalFinalEvent && modalFinalEvent();
    setOpen(false);
  };
  const handleAction = () => {
    const state = modalActionEvent && (!modalActionEvent() || false);
    setOpen(state);
    !state && modalFinalEvent && modalFinalEvent();
  };

  return (
    <>
      {btnName ? (
        <Button
          variant={btnVar || "outlined"}
          startIcon={btnIcon}
          color={btnColor || "secondary"}
          onClick={handleOpen}
          // disabled
          {...other}
          sx={{ "&:hover": { bgcolor: "#secondary" }, ml: 2 }}
        >
          {btnName}
        </Button>
      ) : btnIcon ? (
        <IconButton
          variant="outlined"
          color={btnColor || "primary"}
          onClick={handleOpen}
        >
          {btnIcon}
        </IconButton>
      ) : (
        <></>
      )}

      <ModalContainer state={open} handleClose={handleClose}>
        <Box>
          <Typography variant="h5" component="h3">
            {modalTitle || btnName || "Titre"}
          </Typography>
          <Divider sx={{ my: 3 }} />
          <>{children}</>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
            <Button variant="text" onClick={handleCancel}>
              {modalCancelName || "Annuler"}
            </Button>
            <Button
              variant="contained"
              color={btnActionColor || "secondary"}
              onClick={handleAction}
              type={actionType}
              sx={{
                "&:hover": {
                  bgcolor: btnColor == "error" ? red[900] : "#00695c",
                },
              }}
            >
              {modalActionName || btnName || "Action"}
            </Button>
          </Box>
        </Box>
      </ModalContainer>
    </>
  );
}
