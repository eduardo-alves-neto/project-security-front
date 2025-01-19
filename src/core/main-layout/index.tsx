import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { MenuDrawer } from "./menu-drawer";

export const MainLayout = () => {
  return (
    <Box style={{ display: "flex", height: "100dvh" }}>

     <MenuDrawer/>

      <main style={{ padding: "16px", flex: 1 }}>
        <Outlet />
      </main>
    </Box>
  );
};
