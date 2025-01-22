import Grid from "@mui/material/Grid2";
import { Title } from "../../../components/v1/title";
import { Card, TextField } from "@mui/material";

export const CustomerFormView = () => {
  return (
    <>
      <Title
        title="Clientes"
        buttonTitle="Salvar"
        breadcrumbs={[{ label: "lista", path: -1 }, { label: "criar" }]}
      />

      <Card variant="outlined" sx={{ padding: 2, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
