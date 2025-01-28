import { Box, CircularProgress } from "@mui/material";

export default function CircularProgressComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
        maxHeight: 300,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
