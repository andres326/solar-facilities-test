import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { ROUTES } from "../../util/routes";

export const pages = [
  { text: "Dashboard", icon: <DashboardIcon />, link: ROUTES.DASHBOARD },
];

export const userActions = [{ text: "Logout", icon: <LogoutIcon /> }];
