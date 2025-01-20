import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { DrawerHeader, MenuDrawer } from "./menu-drawer";
import NavBar from "./navBar";

export const MainLayout = () => {
  return (
    <Box style={{ display: "flex", height: "100dvh" }}>
      <CssBaseline />
      {/* NavBar */}
      <NavBar />

      {/* Menu */}
      <MenuDrawer />

      {/* Outlet */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};
