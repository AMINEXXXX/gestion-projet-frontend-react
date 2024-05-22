import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Icon } from "@mui/material";
import AttachEmailRoundedIcon from "@mui/icons-material/AttachEmailRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectById } from "../../../../../hooks/api/useProjectApi";
import { setProject } from "../../../../../redux/ProjectSlice";

export default function Cards() {
  const { project } = useSelector((state) => state.project);
  const { data } = useGetProjectById(project.id);
  const [projectData, setProjectData] = useState();

  useEffect(() => {
    setProjectData(data);
  }, [data])

  const cardInfo = [
    {
      title: "Todo Tasks",
      icon: <FormatListNumberedRoundedIcon />,
      numbre: "5/16",
    },
    {
      title: "In Progress Tasks",
      icon: <StoreRoundedIcon />,
      numbre: "10/16",
    },
    {
      title: "Completed Tasks",
      icon: <SupervisorAccountRoundedIcon />,
      numbre: "1/16",
    },
    {
      title: "Total payment en Dhs",
      icon: <PaidRoundedIcon />,
      // numbre: data?.price,
      // numbre: project?.price,
      numbre: projectData?.price
    },
  ];
  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {cardInfo.map((e, i) => (
          <Grid key={i} item md={3} sm={6} xs={12}>
            <Card
              sx={{
                maxWidth: 345,
                p: 2,
                boxShadow: " 0 1px 12px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    justifyContent: "start",
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    pb: 1,
                  }}
                >
                  <Icon
                    sx={{
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      " & svg": {
                        fontSize: "32px",
                      },
                    }}
                    color="secondary"
                  >
                    {e.icon}
                  </Icon>
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{
                      fontWeight: "700",
                      fontSize: "36px",
                      color: "primary.main",
                      marginBottom: "0px",
                    }}
                  >
                    {e.numbre}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {e.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
