import { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import useGetAllTeamMembers from "./useGetAllTeamMembers";

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

export function CreateUpdateForm({
  isUpdate = false,
  data = null,
  setProjectData,
}) {
  /********** state ***************** */

  const [name, setName] = useState(isUpdate ? data?.name : "");
  const [description, setDescription] = useState(
    isUpdate ? data?.description : ""
  );
  const [duration, setDuration] = useState(isUpdate ? data?.duration : "");
  const [start_date, setStart_date] = useState(
    isUpdate ? data?.start_date : null
  );
  const [price, setPrice] = useState(isUpdate ? data?.price : "");
  const [projectTeam, setProjectTeam] = useState([]);
  console.log("projectTeam: ", projectTeam);

  const members = useGetAllTeamMembers();

  /**********  Submit and validation ****************** */

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectTeam(value);
  };

  useEffect(() => {
    setProjectData({
      name,
      description,
      duration,
      start_date,
      price,
      projectTeam,
    });
  }, [
    setProjectData,
    name,
    description,
    duration,
    start_date,
    price,
    projectTeam,
  ]);

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <TextField
            margin="normal"
            required
            sx={{ flex: 3 }}
            label="Project name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ flex: 2 }}
            name="price"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
        <FormControl required sx={{ width: "100%" }}>
          <InputLabel id="goal">L'équipe</InputLabel>
          <Select
            labelId="goal"
            id="demo-multiple-chip"
            multiple
            value={projectTeam}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="L'équipe" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value?.id} label={value?.fullName} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {members?.map((user, index) => (
              <MenuItem key={index} value={user}>
                {user?.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          sx={{ width: "100%", mt: 2 }}
          label="Debut"
          required
          onChange={(newDate) => setStart_date(newDate?.$d)}
        />
        <Box>
          <>
            <TextField
              margin="normal"
              multiline
              required
              fullWidth
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value.trim())}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="duration"
              label="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </>
        </Box>
      </Box>
    </>
  );
}
