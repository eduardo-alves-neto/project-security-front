import { Outlet } from "react-router";
import { SessionProvider } from "./contexts/SessionContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/queryClient";
import { SnackbarProvider } from "notistack";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";

const Providers = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={5}>
          <ThemeProvider theme={theme}>
            <Outlet />
          </ThemeProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
