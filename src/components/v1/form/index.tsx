import { Box, Button, Card, Stack } from "@mui/material";
import { IForm } from "./types";
import { useNavigate } from "react-router";
import { useMemo } from "react";
import compareStructures from "../../../utils/compareStructures";

export function Form<T>({
  children,
  values,
  oldValues,
  onHandleSubmit,
  onSubmit,
}: IForm<T>) {
  const navigate = useNavigate();

  const hasChange = useMemo(() => {
    if (!oldValues) return true;
    const res = compareStructures<T>({
      currentValues: values,
      oldValues,
    });
    return res.hasChange;
  }, [oldValues, values]);

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
        <Button
          disabled={!hasChange}
          type="submit"
          variant="contained"
          sx={{ boxShadow: 1 }}
        >
          enviar
        </Button>
      </Stack>
    </Card>
  );
}
