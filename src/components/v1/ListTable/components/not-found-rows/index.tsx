import { Box, Typography } from "@mui/material";

export default function NotFoundRowsComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
        backgroundColor: "#f9f9f9",
        borderRadius: "4px",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" color="textSecondary">
        Sem dados
      </Typography>
    </Box>
  );
}
