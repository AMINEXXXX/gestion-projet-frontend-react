import { Box, Button, IconButton, TextField } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
import { useCreateProject } from "../../../../hooks/api/useProjectApi";
import { useSelector } from "react-redux";

export default function AddProject() {
  const create = useCreateProject();
  const [isAdding, setIsAdding] = useState(false);
  const [projectName, setProjectName] = useState("");
  const btnName = "Add project";
  const user = useSelector((state) => state.authentication.user);

  const HandleCreate = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;
    
    setIsAdding(false);
    
    const project = {
      name: projectName,
      start_date: new Date().toISOString().substring(0, 10),
      projectManager: {
        id: user.id,
      }
    };

    create.mutate(project);
    console.log("Done !!!");
  };


  return (
    <>
      <Box>
        {!isAdding ? (
          <Box
            onClick={() => setIsAdding(true)}
            sx={{
              border: "1px solid #80cbc4",
              borderRadius: 1,
              padding: "5%",
              cursor: "pointer",
              width: "30%",
              color: "#00897b",
              fontWeight: "600",
              display: "flex",
              "&:hover": { bgcolor: "#b2dfdb44" },
              transition: ".15s ease-in",
            }}
          >
            <Box sx={{ display: "flex", mx: "auto" }}>
              <AddRoundedIcon sx={{ mr: 2 }} />
              {btnName}
            </Box>
          </Box>
        ) : (
          <form onSubmit={(e) => HandleCreate(e)}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #b2dfdb77",
                borderRadius: 4,
                padding: 2,
                width: "30%",
              }}
            >
              <TextField
                autoFocus
                size="small"
                label="Nom du Projet"
                required
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Box sx={{ display: "flex", mt: 1, gap: 1.5 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => HandleCreate(e)}
                >
                  Ajouter à la liste
                </Button>
                <IconButton onClick={() => setIsAdding(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>
            </Box>
          </form>
        )}
      </Box>
    </>
  );
}
