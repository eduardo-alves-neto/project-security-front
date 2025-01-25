import { Title } from "../../../components/v1/title";
import { Form } from "../../../components/v1/form";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { ICustomer } from "../services/types";
import { useMutation } from "@tanstack/react-query";
import { customerServices } from "../services/customerServices";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";

export const CustomerFormView = () => {
  const navigate = useNavigate();
  const form = useForm<ICustomer>();
  const { handleSubmit, register, watch } = form;

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ICustomer) => {
      await customerServices.create(values);
    },
    onSuccess: () => {
      enqueueSnackbar("Cliente criado com sucesso", { variant: "success" });
      navigate(-1);
    },
    onError: () => {
      enqueueSnackbar("Erro ao criar cliente", { variant: "error" });
    },
  });

  const onSubmit = async ({ values }: { values: ICustomer }) => {
    await mutateAsync(values);
  };

  return (
    <>
      <Title
        title="Clientes"
        hideTitleButton
        breadcrumbs={[{ label: "lista", path: -1 }, { label: "criar" }]}
      />

      <Form onHandleSubmit={handleSubmit} onSubmit={onSubmit} values={watch()}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <TextField
              label={"Nome"}
              required
              fullWidth
              size="small"
              {...register("name", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <TextField
              label={"Sobrenome"}
              required
              fullWidth
              size="small"
              {...register("lastName", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <TextField
              label={"Email"}
              type="email"
              size="small"
              {...register("email")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              label={"Telefone"}
              fullWidth
              type="tel"
              size="small"
              {...register("phone")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              label={"Tipo de pessoa"}
              size="small"
              {...register("typePerson")}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};
