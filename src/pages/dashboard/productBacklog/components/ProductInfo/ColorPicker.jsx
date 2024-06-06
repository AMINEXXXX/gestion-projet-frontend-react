import { Box, Button, Grid } from "@mui/material";
import {
  blue,
  brown,
  deepOrange,
  deepPurple,
  green,
  grey,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import React from "react";

export default function ColorPicker({ setColor }) {
  const items = [
    { color: green[200], hover: green[200] },
    { color: yellow[200], hover: yellow[300] },
    { color: deepPurple[200], hover: deepPurple[300] },
    { color: blue[200], hover: blue[300] },
    { color: green[500], hover: green[600] },
    { color: yellow.A200, hover: yellow.A100 },
    { color: deepPurple[500], hover: deepPurple[600] },
    { color: blue[500], hover: blue[600] },
    { color: green.A700, hover: green.A400 },
    { color: yellow[500], hover: yellow[600] },
    { color: deepPurple[900], hover: deepPurple[800] },
    { color: blue[900], hover: blue[800] },
    { color: red[200], hover: red[300] },
    { color: grey[200], hover: grey[300] },
    { color: brown[200], hover: brown[300] },
    { color: deepOrange[200], hover: deepOrange[300] },
    { color: red[500], hover: red[600] },
    { color: grey[500], hover: grey[600] },
    { color: brown[500], hover: brown[600] },
    { color: deepOrange[500], hover: deepOrange[600] },
    { color: red.A700, hover: red[900] },
    { color: grey[900], hover: grey[800] },
    { color: brown[900], hover: brown[800] },
    { color: deepOrange[900], hover: deepOrange[800] },
    // { color: grey[50], hover: grey[50] },
    // { color: grey[50], hover: grey[50] },
    // { color: grey[50], hover: grey[50] },
    // { color: grey[50], hover: grey[50] },
    // { color: grey[50], hover: grey[50] },
    // { color: grey[50], hover: grey[50] },
  ];

  return (
    <Box display={"flex"} justifyContent={"center"} gap={1} flexWrap={"wrap"}>
      {items.map((button, index) => (
        <Button
          key={index}
          onClick={() => (
            console.log(
              button.color.charAt(1),
              button.color.charAt(1).charCodeAt(0)
            ),
            setColor(button.color)
          )}
          size="small"
          sx={{
            py: 2,
            bgcolor: button.color,
            "&:hover": { bgcolor: button.hover },
          }}
        />
      ))}
    </Box>
  );
}
