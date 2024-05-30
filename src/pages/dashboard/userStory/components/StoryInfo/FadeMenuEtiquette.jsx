import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Fade from "@mui/material/Fade";
import { Box, TextField } from "@mui/material";
import { SwatchesPicker } from "react-color";
import { red, teal, yellow } from "@mui/material/colors";

export default function FadeMenuEtiquette() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState("#eee");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <Box display={"flex"} flexDirection={"column"} gap={1} px={2}>
          <Box bgcolor={color} p={2} borderRadius={2} >title</Box>
          <TextField size="small" />
          {/* <SwatchesPicker onChange={(color) => setColor(color.hex)} /> */}
          {/* <Box
            sx={{
              height: "30px",
              px: 10,
              bgcolor: red[500],
              "&:hover": { bgcolor: red[700] },
              borderRadius: 1.5,
            }}
            onClick={() => setColor("#f44336")}
          /> */}
          <Button
            onClick={() => setColor("#f44336")}
            sx={{
              height: "30px",
              px: 10,
              bgcolor: red[500],
              "&:hover": { bgcolor: red[700] },
            }}
          />
          <Button
            onClick={() => setColor("#ffeb3b")}
            sx={{
              height: "30px",
              px: 10,
              bgcolor: yellow[500],
              "&:hover": { bgcolor: yellow[700] },
            }}
          />
          <Button
            onClick={() => setColor("#009688")}
            sx={{
              height: "30px",
              px: 10,
              bgcolor: teal[500],
              "&:hover": { bgcolor: teal[700] },
            }}
          />
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <Box
                  sx={{
                    // py: 1.75,
                    height: "30px",
                    px: 10,
                    bgcolor: red[500],
                    "&:hover": {bgcolor: red[700]},
                    borderRadius: 1.5,
                  }}
                />
              }
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Box
                  sx={{
                    // py: 1.75,
                    height: "30px",
                    px: 10,
                    bgcolor: blue[400],
                    "&:hover": {bgcolor: blue[700]},
                    borderRadius: 1.5,
                  }}
                />
              }
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Box
                  sx={{
                    // py: 1.75,
                    height: "30px",
                    px: 10,
                    bgcolor: yellow[500],
                    "&:hover": {bgcolor: yellow[700]},
                    borderRadius: 1.5,
                  }}
                />
              }
            />
          </FormGroup> */}

          {/* <Button variant="contained" color="primary" /> */}
        </Box>
      </Menu>
    </div>
  );
}
