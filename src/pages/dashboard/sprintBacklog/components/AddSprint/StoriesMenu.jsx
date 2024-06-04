import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import useGetOneProject from "../../../project/components/useGetOneProject";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 485,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function StoriesMenu({ setUserStories }) {
  const { projectData } = useGetOneProject();
  const [stories, setStories] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("Hi :", value);
    setStories(value);
    setUserStories(value);
  };

  return (
    <div>
      <FormControl required sx={{ width: "100%" }}>
        <InputLabel id="goal">Stories</InputLabel>
        <Select
          labelId="goal"
          id="demo-multiple-chip"
          multiple
          value={stories}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Stories" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value?.id} label={value?.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {projectData?.productBacklogs?.map((product) =>
            product?.userStories?.map((story, index) => (
              <MenuItem key={index} value={story}>
                {story?.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}
