import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
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
  const [isMore, setIsMore] = useState(false);
  const [newName, setNewName] = useState(project.name);
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
    setIsEditing(false);
    const newProject = {
      id: project.id,
      name: (newName.charAt(0).toUpperCase() + newName.slice(1)),
      description: project.description,
      duration: project.duration,
      price: project.price,
      projectTeam: project.projectTeam,
    };
    console.log(newProject.name)
    update.mutate(newProject);
  };

  return (
    <>
      <Card sx={{ pb: 2.5 }}>
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              sx={{ bgcolor: HandleColors(), fontWeight: "700" }}
            >
              {project.name?.charAt(0)}
            </Avatar>
          }
          action={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Link
                onClick={() => (
                  dispatch(
                    setProject(project)
                  ),
                  dispatch(setFirstPage())
                )}
                to={`/dashboard/project`}
                content={<Project />}
              >
                <Button
                  disableElevation
                  variant="contained"
                  color="inherit"
                  size="small"
                  sx={{ fontWeight: "700", py: 1 }}
                >
                  Espace de travail
                </Button>
              </Link>
              <Button
                // disabled
                disableElevation
                variant="contained"
                color="inherit"
                size="small"
                sx={{ fontWeight: "700", py: 1 }}
              >
                Membres ({project.team?.length})
              </Button>
              <Button
                disableElevation
                disableRipple
                variant="contained"
                color="inherit"
                size="small"
                sx={{ fontWeight: "700", py: 1 }}
              >
                {project.duration} Semaines
              </Button>
              <Box
                sx={{
                  margin: -0.5,
                  ml: -1.5,
                  opacity: 0,
                  "&:hover": { opacity: 1 },
                  transition: "ease-in-out .15s",
                }}
              >
                <DeleteProject data={project} />
              </Box>
            </Box>
          }
          title={
            !isEditing ? (
              <Typography
                noWrap
                onClick={() => setIsEditing(true)}
                sx={{ fontSize: 19, cursor: "pointer", width: "100%" }}
              >
                {project.name?.charAt(0).toUpperCase() + project.name?.slice(1)}
              </Typography>
            ) : (
              <form onSubmit={(e) => HandleSubmitOrBlur(e)}>
                <input
                  autoFocus
                  onBlur={(e) => HandleSubmitOrBlur(e)}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    fontSize: 19.5,
                    width: "100%",
                    borderRadius: 5,
                    cursor: "pointer",
                    padding: "8px 5px",
                    margin: ".5px -5px",
                    border: "none",
                    "&:focus": { color: blue[500], BorderColor: blue[500] },
                  }}
                />
              </form>
            )
          }
          subheader={project.description}
        />
      </Card>
    </>
  );
}
