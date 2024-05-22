import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  duration,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import useAllProject from "./components_dyali/useAllProject";
import TableData from "../../../components/Table/TableData";
import CreateProject from "./components_dyali/CreateProject";
import { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import ProjectCard from "./components_dyali/ProjectCard/ProjectCard";
import AddProject from "./components_dyali/AddProject";
import { useGetAllProject } from "../../../hooks/api/useProjectApi";
import { useSelector } from "react-redux";

export default function Home() {
  // const { projectData, columns } = useAllProject();
  const [projects, setProjects] = useState(null);
  const { data } = useGetAllProject();

  useEffect(() => {
    setProjects(data);
    console.log("loaded");
  }, [data]);

  console.log(new Date().toISOString().substring(0, 10));

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ my: 3, fontWeight: "bold" }}>
          Votre Projets
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Container gap={2}>
            <Masonry
              breakpointCols={1}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              <AddProject />
            </Masonry>
          </Container>
        </Box>

        {/* <Box
          sx={{
            my: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box></Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}
          >
            <CreateProject />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            p: 0,
            borderRadius: 2,
          }}
        >
          <TableData rows={projectData} columns={columns} />
        </Box> */}
      </Box>

      {/* <TableData rows={projectData} columns={columns}/> */}
    </>
  );
}
