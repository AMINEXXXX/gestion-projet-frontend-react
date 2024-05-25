import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteToken, deleteUser } from "../../../../redux/Authslice";
import { setFirstPage } from "../../../../redux/PageSlice";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { motion } from "framer-motion";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
export default function ProjectLayout({
  children,
  setProgress,
  setProduct,
  setStory,
  setTask,
  setSprint,
}) {
  const { project } = useSelector((state) => state.project);
  const drawerWidth = 270;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    dispatch(deleteUser());
    dispatch(deleteToken());
    dispatch(setFirstPage());
    navigate("/");
  };

  const menuItems = [
    {
      text: "Progress",
      icon: <SubjectOutlined color="primary" />,
      path: `/dashboard/project`,
      HandleClick: () => {
        setProgress(true);
        setProduct(false);
        setStory(false);
        setTask(false);
        setSprint(false);
      },
    },
    {
      text: "Product Backlogs",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: `/dashboard/product`,
      HandleClick: () => {
        setProgress(false);
        setProduct(true);
        setStory(false);
        setTask(false);
        setSprint(false);
      },
    },
    {
      text: "User Stories",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: `/dashboard/story`,
      HandleClick: () => {
        setProgress(false);
        setProduct(false);
        setStory(true);
        setTask(false);
        setSprint(false);
      },
    },
    {
      text: "Tasks",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: `/dashboard/task`,
      HandleClick: () => {
        setProgress(false);
        setProduct(false);
        setStory(false);
        setTask(true);
        setSprint(false);
      },
    },
    {
      text: "Sprint Backlogs",
      icon: <AddCircleOutlineOutlined color="primary" />,
      path: `/dashboard/sprint`,
      HandleClick: () => {
        setProgress(false);
        setProduct(false);
        setStory(false);
        setTask(false);
        setSprint(true);
      },
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          elevation={0}
          color=""
          sx={{
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            pl: open ? 0 : 3,
            bgcolor: "#80cbc410",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              {/* <Typography variant="h6" noWrap>
                Today is the {format(new Date(), "do MMMM y")}
              </Typography> */}
              <IconButton onClick={() => setOpen(!open)}>
                <MenuRoundedIcon color="primary" />
              </IconButton>
              <Tooltip title="Go back Home">
                <Link to="/" onClick={() => dispatch(setFirstPage())}>
                  <IconButton variant="outlined" size="large">
                    <KeyboardReturnRoundedIcon sx={{ color: teal[500] }} />
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
            <Button
              variant="text"
              sx={{ textTransform: "capitalize", ml: 1 }}
              color="primary"
              onClick={handleLogout}
            >
              <LogoutRoundedIcon />
              <Typography sx={{ fontSize: 12, ml: 0.5 }}>
                Se déconnecter
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>

        {/* {open ? ( */}
        <Box
          component={motion.div}
          animate={{
            opacity: open ? 1 : 0,
            x: open ? 0 : -80,
          }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          sx={{ display: open ? "block" : "none" }}
        >
          <Drawer sx={{ width: drawerWidth }} variant="permanent" anchor="left">
            <Typography
              variant="h5"
              margin=""
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                margin="0px auto"
                py={2}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar
                  sx={{
                    padding: 4,
                    fontWeight: 500,
                    fontSize: 30,
                    bgcolor: teal[500],
                  }}
                >
                  {project.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" py={2} fontSize={20} fontWeight={700}>
                  {project.name.split(" ").length == 1
                    ? project.name
                    : project.name.split(" ").map((str, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                          {str.charAt(0).toUpperCase() + str.slice(1)}
                          <br />
                        </Box>
                      ))}
                </Typography>
              </Box>
            </Typography>
            <Divider sx={{ mt: 3, mb: 4, mx: 2 }} />
            <List sx={{ width: drawerWidth }}>
              {menuItems.map((item, index) => (
                <ListItem
                  style={{
                    width: "235px",
                    margin: "0px auto",
                    marginBottom: "7px",
                    borderRadius: 10,
                  }}
                  key={index}
                  button
                  onClick={() => {
                    item.HandleClick();
                    navigate(item.path);
                  }}
                  sx={
                    location.pathname === item.path
                      ? { bgcolor: "#b2dfdb" }
                      : null
                  }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
        {/* ) : null} */}
        <Box
          sx={{
            padding: 3,
            width: "100vw",
            marginTop: "64px",
            bgcolor: "#80cbc410",
            Height: "100vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
