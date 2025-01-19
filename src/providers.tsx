import { Outlet } from "react-router";
import { SessionProvider } from "./contexts/sessionContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/queryClient";
import { SnackbarProvider } from "notistack";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import { SettingsProvider } from "./contexts/settingsContext";

const Providers = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={5}>
          <SettingsProvider>
            <ThemeProvider theme={theme}>
              <Outlet />
            </ThemeProvider>
          </SettingsProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
