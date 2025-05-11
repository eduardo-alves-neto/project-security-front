import { Button, Card, Stack } from "@mui/material";
import { IForm } from "./types";
import { useNavigate } from "react-router";
import { useMemo } from "react";
import compareStructures from "../../../utils/compareStructures";
import { SkeletonComponent } from "./components/skeletonComponent";

export function Form<T>({
  children,
  values,
  oldValues,
  isLoading,
  onHandleSubmit,
  onSubmit,
  submitButton,
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
    onHandleSubmit(onSubmit && onSubmit({ values: values }));
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
      {isLoading ? <SkeletonComponent /> : <>{children}</>}

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        mt={3}
      >
        <Button
          type="button"
          color="secondary"
          onClick={() => navigate(-1)}
          sx={{ padding: 1 }}
        >
          cancelar
        </Button>

        <Button
          disabled={!hasChange || isLoading}
          type={submitButton?.onClick ? "button" : "submit"}
          variant="contained"
          onClick={submitButton?.onClick && submitButton?.onClick}
          sx={{ boxShadow: 1 }}
        >
          {submitButton?.buttonLabel ? submitButton?.buttonLabel : "enviar"}
        </Button>
      </Stack>
    </Card>
  );
}
