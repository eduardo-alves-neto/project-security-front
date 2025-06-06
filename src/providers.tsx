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
          <ThemeProvider theme={theme}>
            <SettingsProvider>
              <Outlet />
            </SettingsProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
