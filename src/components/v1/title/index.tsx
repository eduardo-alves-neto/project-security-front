import { Box, Button, Stack, Typography } from "@mui/material";
import { IoMdAdd } from "react-icons/io";

interface ITitle {
  title: string;
}

export const Title = ({ title }: ITitle) => {
  return (
    <>
      <Stack
        mb={2}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="start" flexDirection="column">
          <Typography color="text.secondary">
            {"Mui / teste / teste2"}
          </Typography>

          <Typography fontSize={29} fontWeight="bold">
            {title}
          </Typography>
        </Box>

        <Box>
          <Button variant="contained" color="secondary" startIcon={<IoMdAdd />}>
            Novo
          </Button>
        </Box>
      </Stack>
    </>
  );
};
