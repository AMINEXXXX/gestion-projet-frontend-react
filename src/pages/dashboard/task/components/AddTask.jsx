import React, { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useAllProducts from "../../productBacklog/components/useAllProducts";
import { useCreateTask } from "../../../../hooks/api/useTaskApi";
import useAllStories from "../../userStory/components/useAllStories";
import useAllTasks from "./useAllTasks";

export default function AddTask() {
  const mutation = useCreateTask();
  const { data } = useAllTasks();
  // const { productsData } = useAllProducts();
  // const storyData = productsData?.map((product) => {
  //   const { storiesData } = useAllStories(product.id);
  //   return storiesData?.map((story) => {
  //     return { id: story.id, name: story.name, tasks: story.tasks };
  //   });
  // });

  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [storyId, setStoryId] = useState(null);
  const btnName = "Add task";

  const HandleCreate = (e) => {
    e.preventDefault();
    if (!taskName.trim() || storyId == null) {
      return;
    }

    const task = {
      name: taskName,
      userStory: {
        id: storyId,
      },
    };

    mutation.mutate(task);
    setTaskName("");
    setStoryId(null);
  };


  return (
    <Box>
      {!isAdding ? (
        <Box
          onClick={() =>
            data?.length == 0
              ? alert("U can't add task while there is no story !!!")
              : setIsAdding(true)
          }
          sx={{
            border: "1px solid #80cbc4",
            borderRadius: 1,
            padding: "50px",
            mb: 8,
            cursor: "pointer",
            width: "250px",
            color: "#00897b",
            fontWeight: "600",
            display: "flex",
            "&:hover": { bgcolor: "#b2dfdb44" },
            // transition: ".15s ease-in",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <AddRoundedIcon sx={{ mr: 2 }} />
            {btnName}
          </Box>
        </Box>
      ) : (
        <form
          onKeyDown={(e) => {
            if (e.keyCode === 27) setIsAdding(false);
          }}
          onSubmit={(e) => HandleCreate(e)}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid #ddd", //#b2dfdb77
              borderRadius: 4,
              padding: 2,
              mb: 1.3,
              width: "250px",
              bgcolor: "white",
            }}
          >
            <TextField
              fullWidth
              autoFocus
              size="small"
              label="Nom"
              value={taskName}
              required
              onChange={(e) => setTaskName(e.target.value)}
            />
            <FormControl sx={{ my: 1 }} size="small">
              <InputLabel id="demo-select-small-label">Story</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={storyId}
                label="Story"
                fullWidth
                required
                onChange={(e) => setStoryId(e.target.value)}
              >
                {data?.map((story) => (
                  <MenuItem key={story.id} value={story.id}>
                    {story.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", mt: 1, gap: 1.5 }}>
              <Button
                variant="contained"
                size="small"
                onClick={(e) => HandleCreate(e)}
              >
                Ajouter
              </Button>
              <IconButton
                onClick={() => (
                  setIsAdding(false), setStoryId(null), setTaskName("")
                )}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}
