import { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
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

export function CreateForm({ setSprintData }) {
  /********** state ***************** */

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [goal, setGoal] = useState("");

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setSprintData({
      name,
      duration,
      start_date,
      end_date,
      goal,
    });
  }, [setSprintData, name, duration, start_date, end_date, goal]);


  console.log("--> c.u");
  // console.log(userDepartment);
  return (
    <>
      <Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            margin="normal"
            required
            sx={{ flex: 3 }}
            label="Nom"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            sx={{ flex: 2 }}
            label="Duration"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value.trim())}
          />
        </Box>
        {/* <Box sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="goal">But</InputLabel>
            <Select
              labelId="goal"
              multiple
              value={goal}
              onChange={(event) => {
                const value = event.target.value;
                setgoal(
                  typeof value === "string" ? value.split(",") : value
                );
              }}
              input={<OutlinedInput label="Tag" />}
              renderValue={(_goal) =>
                Object.keys(roles)
                  ?.filter((key) => _goal.indexOf(key) > -1)
                  .map((key) => roles[key])
                  .join(", ")
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
            >
              {Object.keys(roles).map((key) => (
                <MenuItem key={key} value={key}>
                  <Checkbox checked={goal.indexOf(key) > -1} />
                  <ListItemText primary={roles[key]} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box> */}

        <Box>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Début"
            type="date"
            value={start_date}
            onChange={(e) => setStart_date(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Fin"
            type="date"
            value={end_date}
            onChange={(e) => setEnd_date(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            margin="normal"
            required
            multiline
            minRows={4}
            fullWidth
            label="But"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
}
