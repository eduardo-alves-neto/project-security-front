import { Box, Button, Stack } from "@mui/material";
import { IForm } from "./types";

export function Form<T>({
  children,
  values,
  onHandleSubmit,
  onSubmit,
}: IForm<T>) {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleSubmit(onSubmit({ values: values }));
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: 1,
        borderRadius: 1,
        borderColor: "divider",
      }}
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
        <Button type="button">cancelar</Button>
        <Button type="submit" variant="contained">
          enviar
        </Button>
      </Stack>
    </Box>
  );
}
