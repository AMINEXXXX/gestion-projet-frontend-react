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
  const [price, setPrice] = useState(isUpdate ? data?.price : "");

  /**********  Submit and validation ****************** */

  useEffect(() => {
    setProjectData({
      name,
      description,
      duration,
      price,
    });
  }, [setProjectData, name, description, duration, price]);

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", gap: 2 }}>
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
