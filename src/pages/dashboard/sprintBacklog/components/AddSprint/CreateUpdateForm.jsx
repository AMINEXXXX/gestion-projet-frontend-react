import { useEffect, useState } from "react";

import { Box, OutlinedInput, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import StoriesMenu from "./StoriesMenu";

export function CreateUpdateForm({ setSprintData, data, isUpdate = false }) {
  /********** state ***************** */

  const [name, setName] = useState(isUpdate ? data?.name : "");
  const [duration, setDuration] = useState(isUpdate ? data?.duration : "");
  const [userStories, setUserStories] = useState(isUpdate ? data?.userStories : []);
  const [start_date, setStart_date] = useState(isUpdate ? data?.start_date : null);
  const [goal, setGoal] = useState(isUpdate ? data?.goal : "");

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setSprintData({
      name,
      duration,
      start_date,
      userStories,
      goal,
    });
  }, [setSprintData, name, duration, start_date, userStories, goal]);

  return (
    <>
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
      <Box mt={1}>
        <StoriesMenu setUserStories={setUserStories} />
        {/* <FormControl fullWidth>
            <InputLabel id="goal">But</InputLabel>
            <Select
              labelId="goal"
              multiple
              value={goal}
              onChange={(event) => {
                const value = event.target.value;
                setGoal(
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
          </FormControl> */}
      </Box>

      <DatePicker
        sx={{ width: "100%", mt: 2 }}
        label="Debut"
        required
        onChange={(newDate) => setStart_date(newDate?.$d)}
      />
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
    </>
  );
}
