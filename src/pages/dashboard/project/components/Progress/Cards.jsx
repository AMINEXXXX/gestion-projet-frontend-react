import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid, Icon } from "@mui/material";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { TaskAlt } from "@mui/icons-material";
import { ShowChart } from "@mui/icons-material";
import { SignalCellularAlt } from "@mui/icons-material";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";
import { useSelector } from "react-redux";
import { useGetProjectById } from "../../../../../hooks/api/useProjectApi";
import useGetOneProject from "../useGetOneProject";

export default function Cards() {
  // const { project } = useSelector((state) => state.project);
  // const { data } = useGetProjectById(project.id);
  // console.log(data);
  // const [projectData, setProjectData] = useState();

  // useEffect(() => {
  //   setProjectData(data);
  // }, [data])
  const { projectData } = useGetOneProject();

  let todo = 0;
  let inProgress = 0;
  let done = 0;
  let total = 0;

  projectData?.productBacklogs?.forEach((product) => {
    product?.userStories?.forEach((story) => {
      total += story?.tasks?.length;
      story?.tasks?.forEach((task) => {
        if (task?.state === "Todo") todo++;
        if (
          task?.state === "Doing" ||
          task?.state === "Test" ||
          (task?.state === "Done" && task?.valid == false)
        )
          inProgress++;
        if (task?.state === "Done" && task?.valid == true) done++;
      });
    });
  });

  const cardInfo = [
    {
      title: "Tâches à faire",
      icon: <FormatListNumberedRoundedIcon />,
      numbre: total === 0 ? 0 : `${todo}/${total}`,
    },
    {
      title: "Tâches en cours",
      icon: (
        <>
          <ShowChart />
          {/* <SignalCellularAlt /> */}
        </>
      ),
      numbre: total === 0 ? 0 : `${inProgress}/${total}`,
    },
    {
      title: "Tâches terminées",
      icon: <TaskAlt />,
      numbre: total === 0 ? 0 : `${done}/${total}`,
    },
    {
      title: "L'équipe",
      icon: <GroupRoundedIcon />,
      numbre: projectData?.team?.length,
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
