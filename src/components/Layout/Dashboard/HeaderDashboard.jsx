import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Badge from "@mui/material/Badge";

import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useSelector, useDispatch } from "react-redux";
import { switchThemeMode } from "../../../redux/ThemeSlice";
import { deleteUser, deleteToken } from "../../../redux/Authslice";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import CreateProject from "../../../pages/dashboard/home/components_dyali/CreateProject";

export default function HeaderDashboard({ setSideBarState }) {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(deleteUser());
    dispatch(deleteToken());
    navigate("/");
  };
  const isDark = themeMode === "dark";
  return (
    <Box
      sx={{
        mx: "2.5%",
        my: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <IconButton
          color="secondary"
          onClick={() => setSideBarState((prev) => !prev)}
        >
          <MenuRoundedIcon />
        </IconButton>
        {/* {user?.role[0] === "PROJECT_MANAGER" ||
        user?.role[0] === "SUPER_ADMIN" ? (
          <CreateProject />
        ) : null} */}
      </Box>
      <Box>
        {/* <SwitchTheme
          isDark={isDark}
          switchThemeMode={() => dispatch(switchThemeMode())}
        ></SwitchTheme> */}

        {/* <Notification isDark={isDark}></Notification> */}
        <Button
          variant="text"
          sx={{ textTransform: "capitalize", ml: 1 }}
          color={isDark ? "primary" : "secondary"}
          onClick={handleLogout}
        >
          <LogoutRoundedIcon />
          <Typography sx={{ fontSize: 12, ml: 0.5 }}>Se déconnecter</Typography>
        </Button>
      </Box>
    </Box>
  );
}

function SwitchTheme({ isDark, switchThemeMode }) {
  return (
    <IconButton
      aria-label="switch Theme Mode"
      color="secondary"
      onClick={switchThemeMode}
    >
      {isDark ? (
        <DarkModeRoundedIcon sx={{ color: "primary.main" }} />
      ) : (
        <LightModeRoundedIcon />
      )}
    </IconButton>
  );
}

function Notification({ isDark }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          aria-label="Notifications"
          color={isDark ? "primary" : "secondary"}
          onClick={handleClick}
        >
          <Badge badgeContent={4} color="error">
            <NotificationsActiveRoundedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          Ipsum, dolor sit amet consectetur{" "}
          <Chip
            color="success"
            label="success"
            variant="outlined"
            sx={{ ml: 2 }}
          />{" "}
        </MenuItem>
        <Divider />
        <MenuItem>
          DolorLorem sit amet consectetur adipisicing elit
          <Chip
            color="error"
            label="error"
            variant="outlined"
            sx={{ ml: 2, font: 8 }}
          />{" "}
        </MenuItem>
        <Divider />
        <MenuItem>
          Vonsectetur adipisicing Dolor sit amet elit
          <Chip
            color="info"
            label="info"
            variant="outlined"
            sx={{ ml: 2, font: 8 }}
          />{" "}
        </MenuItem>
        <Divider />
        <MenuItem>
          Met consectetur adipisicing elit
          <Chip
            color="warning"
            label="warning"
            variant="outlined"
            sx={{ ml: 2, font: 8 }}
          />{" "}
        </MenuItem>
      </Menu>
    </>
  );
}
