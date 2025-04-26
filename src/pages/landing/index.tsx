import { Box, Button, Container, Grid, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001848 0%, #0d47a1 100%)",
        color: "white",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              SecureCRM
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Gerencie sua empresa de segurança com eficiência e precisão
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, fontSize: "1.1rem", opacity: 0.8 }}
            >
              O SecureCRM é a solução completa para gerenciamento de empresas de
              segurança. Controle seus clientes, equipes e operações em um único
              lugar, com total segurança e confiabilidade.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/auth/sign-in", { viewTransition: true })}
                sx={{
                  bgcolor: "white",
                  color: "#1a237e",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                Entrar
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/auth/sign-up", { viewTransition: true })}
                sx={{
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.9)",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Cadastrar
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Box
              component="img"
              src="/security-illustration.svg"
              alt="Ilustração de segurança"
              sx={{
                width: "100%",
                maxWidth: 500,
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
