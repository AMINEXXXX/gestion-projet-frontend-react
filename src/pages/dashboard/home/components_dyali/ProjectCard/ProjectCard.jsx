import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteProject from "../DeleteProject";
import { useUpdateProject } from "../../../../../hooks/api/useProjectApi";
import { Link } from "react-router-dom";
import {
  blue,
  red,
  pink,
  green,
  yellow,
  teal,
  purple,
  deepPurple,
  indigo,
  lightBlue,
  cyan,
  lightGreen,
  lime,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from "@mui/material/colors";
import Project from "../../../project/components/Project";
import { useDispatch, useSelector } from "react-redux";
import { setFirstPage } from "../../../../../redux/PageSlice";
import { setProject } from "../../../../../redux/ProjectSlice";

export default function ProjectCard({ project }) {
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingNbrSemaines, setIsEditingNbrSemaines] = useState(false);
  const [newName, setNewName] = useState(project.name);
  const [newDescription, setNewDescription] = useState(project.description);
  const [newDuration, setNewDuration] = useState(project.duration);
  const update = useUpdateProject();

  const HandleColors = () => {
    const diviseur = 19;
    const num = Math.floor(Math.random() * diviseur + 1);
    switch (num % diviseur) {
      case 0:
        return blue[500];
      case 1:
        return red[500];
      case 2:
        return pink[500];
      case 3:
        return green[500];
      case 4:
        return yellow[500];
      case 5:
        return teal[500];
      case 6:
        return purple[500];
      case 7:
        return deepPurple[500];
      case 8:
        return indigo[500];
      case 9:
        return lightBlue[500];
      case 10:
        return cyan[500];
      case 11:
        return lightGreen[500];
      case 12:
        return lime[500];
      case 13:
        return amber[500];
      case 14:
        return orange[500];
      case 15:
        return deepOrange[500];
      case 16:
        return brown[500];
      case 17:
        return grey[500];
      case 18:
        return blueGrey[500];
    }
  };

  const HandleSubmitOrBlur = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDescription.trim()) return;

    setIsEditing(false);
    const newProject = {
      id: project.id,
      name: newName.charAt(0).toUpperCase() + newName.slice(1),
      description: newDescription,
      duration: newDuration,
    };

    setIsEditing(false);
    setIsEditingDescription(false);
    setIsEditingNbrSemaines(false);
    update.mutate(newProject);
  };

  return (
    <>
      <Card sx={{ pb: 2.5 }}>
        <CardHeader
          avatar={
            <Link
              onClick={() => (
                dispatch(setProject(project)), dispatch(setFirstPage())
              )}
              to={`/dashboard/project/progress`}
              content={<Project />}
            >
              <Avatar
                variant="rounded"
                sx={{ bgcolor: grey[700], fontWeight: "700" }}
              >
                {project.name?.charAt(0)}
              </Avatar>
            </Link>
          }
          action={<DeleteProject data={project} />}
          title={
            <Box width={"100%"} height={"40px"}>
              {!isEditing ? (
                <Typography
                  variant="p"
                  noWrap
                  onClick={() => setIsEditing(true)}
                  sx={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    width: "100%",
                    pl: "5px",
                  }}
                >
                  {project.name?.charAt(0).toUpperCase() +
                    project.name?.slice(1)}
                </Typography>
              ) : (
                <form onSubmit={(e) => HandleSubmitOrBlur(e)}>
                  <input
                    autoFocus
                    onBlur={(e) => HandleSubmitOrBlur(e)}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                      fontSize: "1.5rem",
                      width: "100%",
                      borderRadius: 5,
                      padding: "1.5px 0px 1.5px 4px",
                      border: "none",
                      outlineColor: teal[500],
                    }}
                  />
                </form>
              )}
            </Box>
          }
          subheader={
            !isEditingNbrSemaines ? (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ cursor: "pointer" }}
                onClick={() => setIsEditingNbrSemaines(true)}
              >
                {project.duration + " semaine(s)"}
              </Typography>
            ) : (
              <form onSubmit={HandleSubmitOrBlur}>
                <input
                  autoFocus
                  value={newDuration}
                  onBlur={HandleSubmitOrBlur}
                  type="text"
                  onChange={(e) => setNewDuration(e.target.value)}
                  style={{
                    borderRadius: 5,
                    padding: "1.5px 0px 1.5px 4px",
                    border: "none",
                    outlineColor: teal[500],
                  }}
                />
              </form>
            )
          }
        />
        <CardContent>
          {!isEditingDescription ? (
            <Typography
              onClick={() => setIsEditingDescription(true)}
              variant="body2"
              color={"textSecondary"}
            >
              {project.description}
            </Typography>
          ) : (
            <>
              <TextField
                fullWidth
                autoFocus
                value={newDescription}
                multiline
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <Box
                sx={{ mt: 2 }}
                display={"flex"}
                gap={2}
                alignItems={"center"}
              >
                <Button variant="contained" onClick={HandleSubmitOrBlur}>
                  Enregistrer
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsEditingDescription(false)}
                >
                  Annuler
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
