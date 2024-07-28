import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { DrawerStyled, DrawerHeaderStyled } from "./drawer-components";
import { List } from "../List";
import { pages, userActions } from "./config.jsx";

export const Drawer = ({ open, handleDrawerClose, theme }) => {
  return (
    <DrawerStyled variant="permanent" open={open}>
      <DrawerHeaderStyled>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeaderStyled>
      <Divider />
      <List listOfItems={pages} />
      <Divider />
      <List listOfItems={userActions} />
    </DrawerStyled>
  );
};
