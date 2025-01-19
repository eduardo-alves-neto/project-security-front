import { Box, CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        
      }}
    >
      <CircularProgress color='secondary' size={60} />
    </Box>
  );
};

export default LoadingPage;
