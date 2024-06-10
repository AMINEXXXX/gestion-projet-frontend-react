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
import { ReactTyped } from "react-typed";
import { grey } from "@mui/material/colors";

export default function Home() {
  const user = useSelector((state) => state.authentication.user);
  const { projectData, columns } = useAllProject();
  // const [projects, setProjects] = useState(null);
  // const { data } = useGetAllProject();

  // useEffect(() => {
  //   setProjects(data);
  //   console.log("loaded");
  // }, [data]);

  console.log(new Date().toISOString().substring(0, 10));

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ my: 3, fontWeight: "bold" }}>
          Votre Projets
        </Typography>
        <Typography
          sx={{ textAlign: "start", fontWeight: 600, color: grey[700], ml: 3 }}
        >
          <ReactTyped
            strings={[
              "La gestion de projet implique la planification minutieuse et l'organisation des ressources pour atteindre des objectifs spécifiques dans des délais définis.",
              "Une communication efficace entre les membres de l'équipe est essentielle pour assurer la réussite d'un projet.",
              "Identifier, évaluer et gérer les risques potentiels est une partie cruciale de la gestion de projet.",
              "Un bon gestionnaire de projet s'assure que toutes les tâches sont terminées dans les délais prévus.",
              "Suivre l'avancement du projet et évaluer les performances permettent d'ajuster les plans et de s'assurer que les objectifs sont atteints.",
              "La gestion de projet nécessite de coordonner les efforts de différentes équipes pour garantir que toutes les parties du projet avancent de manière synchronisée.",
              "Un gestionnaire de projet efficace sait comment allouer les ressources humaines et matérielles de manière optimale.",
              "Le contrôle des coûts et le respect du budget sont essentiels pour la réussite du projet.",
              "L'utilisation d'outils de gestion de projet, tels que les logiciels de planification, peut améliorer la productivité et l'efficacité.",
              "Un gestionnaire de projet doit être flexible et prêt à ajuster les plans en réponse aux changements et aux défis imprévus.",
              "La gestion de projet nécessite un leadership fort pour motiver l'équipe et maintenir un haut niveau de performance.",
              "S'assurer que les livrables répondent aux standards de qualité attendus est une priorité dans la gestion de projet.",
              "Maintenir une documentation complète et précise est crucial pour la transparence et la traçabilité du projet.",
              "Comprendre et gérer les attentes des parties prenantes est essentiel pour obtenir leur soutien et assurer la réussite du projet.",
              "Après la fin du projet, il est important de réaliser une évaluation post-projet pour identifier les leçons apprises et les opportunités d'amélioration pour les futurs projets.",
            ]}
            typeSpeed={10}
            backSpeed={20}
            backDelay={7000}
            showCursor={false}
            loop
          />
        </Typography>
        {user.role[0] == "PROJECT_MANAGER" && (
          <Box display={"flex"} justifyContent={"space-between"} py={5}>
            <Box />
            <CreateProject />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            py: user.role[0] == "TEAM_MEMBER" ? 10 : null,
          }}
        >
          {/* <Box> */}
            <Masonry
              breakpointCols={
                projectData?.length <= 3 ? projectData?.length : 3
              }
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {projectData?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Masonry>
          {/* </Box> */}
        </Box>
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

      {/* <TableData rows={projectData} columns={columns}/> */}
    </>
  );
}
