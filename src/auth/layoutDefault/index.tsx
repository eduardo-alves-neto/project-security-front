import Grid from "@mui/material/Grid2";

interface ILayoutDefault {
  children: React.ReactNode;
}

export const LayoutDefault = ({ children }: ILayoutDefault) => {
  return (
    <Grid container height="100dvh">
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        size={{ xs: 12, md: 6 }}
      >
        {children}
      </Grid>

      <Grid size={{ xs: 0, sm: 0, md: 6 }} sx={{backgroundColor:'#1C4532'}}>

      </Grid>
    </Grid>
  );
};
