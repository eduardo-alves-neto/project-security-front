import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useSession } from "../../contexts/sessionContext";

export default function Home() {
  const { session } = useSession();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h5" color='primary'>{`Bem vindo ${session?.user.email}`}</Typography>
      </Grid>
    </Grid>
  );
}
