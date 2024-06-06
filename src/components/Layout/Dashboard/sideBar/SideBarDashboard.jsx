/* eslint-disable react/prop-types */
// import { menuData } from "./menuData";
import { Box, Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

// import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
// import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useEffect, useState } from "react";

import { MenuData } from "../../../../routers/MenuData";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMenuData } from "../../../../routers/useMenuData";
import { useGetAllProject } from "../../../../hooks/api/useProjectApi";
import Project from "../../../../pages/dashboard/project/components/Project";
import axios from "axios";

export default function SideBarDashboard() {
  const [projects, setProjects] = useState(null);
  const data = useGetAllProject()?.data;
  const menuData = useMenuData();

  useEffect(() => {
    console.log(data);
    setProjects(data);
  }, [data]);

  const sideBarMenuData = menuData.map((e) => {
    return {
      name: e.name,
      icon: e.icon,
      path: e.path,
      permissions: e.permissions,
      children: e.children,
      isHidden: e.isHidden,
    };
  });

  return (
    <Box sx={{ px: 2 }}>
      <>
        <SideBarHeader />
      </>
      <Divider sx={{ my: 4 }} />
      <>
        <BarMenu projects={projects} list={sideBarMenuData} isSubList={false} />
      </>
    </Box>
  );
}

function SideBarHeader() {
  const user = useSelector((state) => state.authentication.user);

  if (!user) return <></>;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: 3,
        mt: 5,
        mb: 4,
        mx: 1,
      }}
    >
      <Avatar sx={{ backgroundColor: "secondary.light", p: 4, fontSize: 24 }}>
        {user?.fullName.slice(0, 2).toUpperCase()}
      </Avatar>
      <Box>
        <Typography component="h4" variant="h6" sx={{ fontWeight: "bold" }}>
          {user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}
        </Typography>
        <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
          {user.role.join(", ")}
        </Typography>
        <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
          {user.userNumber}
        </Typography>
      </Box>
    </Box>
  );
}

function BarMenu({ projects, list, isSubList, path = null }) {
  // const navigate = useNavigate();
  const user = useSelector((state) => state.authentication.user);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        pl: isSubList && 2,
        fontSize: "8px",
      }}
      component="nav"
    >
      {list?.map((elem, index) =>
        elem?.name === "Projects" ? (
          <NestedList
            key={index + elem.name}
            icon={
              elem.icon ? (
                elem.icon
              ) : (
                <HorizontalRuleRoundedIcon sx={{ fontSize: 12 }} />
              )
            }
            text={elem?.name}
            subList={
              elem?.name === "Projects"
                ? projects?.map((project) => ({
                    name: project.name,
                    // path: ` `,
                    // component: <Project />,
                  }))
                : elem.children
            }
            path={path ? `${path}/${elem.path}` : `${elem.path}`}
          />
        ) : (
          <ListItemButtonLink
            key={index + elem?.name}
            data={elem}
            path={path}
          />
        )
      )}
    </List>
  );
}

function ListItemButtonLink({ data, path }) {
  const [active, setActive] = useState(false);

  return (
    !data?.isHidden && (
      <NavLink
        to={path ? `./${path}/${data?.path}` : `./${data?.path}`}
        className={({ isActive }) => {
          setTimeout(() => setActive(isActive), 50);
          // setActive(isActive) ;
          return "";
        }}
      >
        <ListItemButton
          sx={{
            color: active && "primary.main",
            background: active && "#80cbc455",
            borderRadius: 2.5,
            "& svg": {
              color: active && "primary.main",
            },
            "&:hover": {
              background: active && "#80cbc466",
            },
          }}
        >
          <ListItemIcon>
            {data?.icon ? (
              data?.icon
            ) : (
              <HorizontalRuleRoundedIcon sx={{ fontSize: 12 }} />
            )}
          </ListItemIcon>
          <ListItemText primary={data?.name} />
        </ListItemButton>
      </NavLink>
    )
  );
}

function NestedList({ icon, text, path, subList }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        sx={{ borderRadius: 2.5, my: 0.62 }}
        onClick={handleClick}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <BarMenu list={subList} isSubList={true} path={path} />
      </Collapse>
    </>
  );
}
