import { Box, Button, Card, Stack } from "@mui/material";
import { IForm } from "./types";
import { useNavigate } from "react-router";

export function Form<T>({
  children,
  values,
  onHandleSubmit,
  onSubmit,
}: IForm<T>) {
  const navigate = useNavigate();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleSubmit(onSubmit({ values: values }));
  };

  return (
    <Card
      sx={{
        padding: 1.5,
      }}
      variant="outlined"
      component={"form"}
      onSubmit={onFormSubmit}
    >
      <Box>{children}</Box>

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        mt={3}
      >
        <Button type="reset" variant="outlined" color="error">
          Limpar dados
        </Button>
        <Button
          type="button"
          color="secondary"
          onClick={() => navigate(-1)}
          sx={{ padding: 1 }}
        >
          cancelar
        </Button>
        <Button type="submit" variant="contained" sx={{ boxShadow: 1 }}>
          enviar
        </Button>
      </Stack>
    </Card>
  );
}
