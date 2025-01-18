import { BrowserRouter, Route, Routes } from "react-router";
import { LoginComponent } from "./auth/login";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
