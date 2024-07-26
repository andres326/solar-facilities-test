import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Drawer } from "../components/Drawer";
import { Header } from "../components/Header/Header";

export const Layout = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} theme={theme} />
      {children}
    </Box>
  );
};
