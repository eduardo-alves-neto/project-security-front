import { Box, CssBaseline } from "@mui/material";
import { DrawerHeader, MenuDrawer } from "./menu-drawer";
import NavBar from "./navBar";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box style={{ display: "flex", height: "100dvh" }}>
      <CssBaseline />
      <NavBar />

      <MenuDrawer />

      <Box
        component="main"
        sx={{ flexGrow: 1, paddingX: 1, overflow: "hidden" }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
