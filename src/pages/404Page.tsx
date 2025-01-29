import React from "react";
import { Link } from "react-router";
import { Box, Typography, Button } from "@mui/material";
import { BiSolidHomeHeart } from "react-icons/bi";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
    >
      <Typography variant="h1" color="#1C4532" fontWeight="bold" gutterBottom>
        404
      </Typography>

      <Typography variant="h5" color="textSecondary" gutterBottom>
        Ops! A página que você procura não existe.
      </Typography>

      <Typography variant="body1" color="textSecondary" mb={4}>
        Pode ter sido movido ou excluído.
      </Typography>
      <Button
        variant="contained"
        color="inherit"
        sx={{ boxShadow: "none" }}
        startIcon={<BiSolidHomeHeart />}
        component={Link}
        to="/home"
      >
        Voltar para o início
      </Button>
    </Box>
  );
};

export default NotFoundPage;
