/********** pages ************/

import Home from "../pages/dashboard/home";
import { ListUserPage } from "../pages/dashboard/administration/user-management";
import Project from "../pages/dashboard/project/components/Project";

/********** icons ************/
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { user_role } from "../global";

export const MenuData = [
  {
    name: "Administration",
    icon: <SettingsRoundedIcon />,
    path: "administration",
    component: <ListUserPage />,
    permissions: [],
  },
  {
    name: "Accueil",
    icon: <HomeRoundedIcon />,
    path: "",
    component: <Home />,
    permissions: [user_role.PROJECT_MANAGER, user_role.TEAM_MEMBER],
  },

  // {
  //   name: "Projects",
  //   icon: <WorkRoundedIcon />,
  //   path: "",
  //   permissions: [user_role.PROJECT_MANAGER],
  // },

  // {
  //   name: "Marchés",
  //   icon: <WorkRoundedIcon />,
  //   path: "marche",
  //   component: <br />,
  //   permissions: [user_role.BO , user_role.DEPARTMENT],
  //   children: [
  //     {
  //       name: "Liste des marchés",
  //       path: "list-marche",
  //       component: <ListMarchePage />,
  //       permissions: [user_role.BO , user_role.DEPARTMENT],

  //     },
  //     {
  //       name: "Creation Marché",
  //       path: "creation-marche",
  //       component: <CreateMarchePage/>,
  //       permissions: [user_role.BO  , user_role.DEPARTMENT ],
  //     },
  //     {
  //       name: "Liste des articles",
  //       path: "list-article",
  //       component: <ListArticlePage />,
  //       permissions: [user_role.BO , user_role.DEPARTMENT],

  //     },
  //   ],
  // },
  // {
  //   name: "Fournisseur",
  //   icon: <WarehouseRoundedIcon />,
  //   path: "fournisseur",
  //   component: <h1>Fournisseur</h1>,
  //   permissions: ["ADMIN"],
  //   children: [
  //     {
  //       name: "Creation fournisseur",
  //       path: "creation-fournisseur",
  //       component: <CreateSupplierPage />,
  //       permissions: ["ADMIN"],
  //     },
  //     {
  //       name: "Liste des fournisseur",
  //       path: "list-fournisseur",
  //       component: <ListSupplierPage />,
  //       permissions: ["ADMIN"],
  //     },
  //   ],
  // },
  // {
  //   name: "Attachement",
  //   icon: <AttachEmailRoundedIcon />,
  //   path: "attachement",
  //   component: <h1>Attachement</h1>,
  //   permissions: ["DEPARTMENT"],
  //   children: [
  //     {
  //       name: "Creation attachement",
  //       path: "creation-attachement",
  //       component: <CreateAttachmentPage/>,
  //       permissions: [user_role.BO ],
  //     },
  //     {
  //       name: "Liste des attachement",
  //       path: "list-attachement",
  //       component:  <ListAttachmentPage/> ,
  //       permissions: [user_role.BO , user_role.DEPARTMENT],
  //     },
  //     {
  //       name: "Decompte",
  //       path: "Decompte",
  //       component:  <DecomptePage/> ,
  //       permissions: [user_role.DEPARTMENT],
  //     },
  //     {
  //       name: "Decompte-definitif",
  //       path: "Decompte-definitif",
  //       component:  <DecompteDefinitifPage/> ,
  //       permissions: [user_role.DEPARTMENT],
  //     },
  //   ],
  // },
];
