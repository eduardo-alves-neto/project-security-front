import { Title } from "../../../components/v1/title";
import { Form } from "../../../components/v1/form";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { ICustomer } from "../services/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { customerServices } from "../services/customerServices";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

export const CustomerFormView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const form = useForm<ICustomer>();
  const { handleSubmit, register, watch } = form;
  const [oldValues, setOldValues] = useState<ICustomer>({} as ICustomer);

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ICustomer) => {
      if (id) {
        await customerServices.update(Number(id), values);
      } else {
        await customerServices.create(values);
      }
    },
    onSuccess: () => {
      enqueueSnackbar(`Cliente ${id ? 'atualizado' : 'criado'} com sucesso`, { variant: "success" });
      navigate(-1);
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || `Erro ao ${id ? 'atualizar' : 'criar'} cliente`, { variant: "error" });
    },
  });

  const { isLoading } = useQuery({
    queryKey: ["customer", id],
    enabled: !!id,
    queryFn: async () => {
      const data = await customerServices.getById(Number(id));
      form.reset(data);
      setOldValues(data);
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
        breadcrumbs={[{ label: "lista", path: -1 }, { label: id ? "editar" : "criar" }]}
      />

      <Form
        onHandleSubmit={handleSubmit}
        onSubmit={onSubmit}
        values={watch()}
        oldValues={oldValues}
        isLoading={isLoading}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              required
              fullWidth
              size="small"
              label={"Nome"}
              value={watch("name")}
              {...register("name", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              required
              fullWidth
              size="small"
              value={watch("lastName")}
              label={"Sobrenome"}
              {...register("lastName", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              type="email"
              label={"Email"}
              value={watch("email")}
              {...register("email")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              type="tel"
              size="small"
              label={"Telefone"}
              value={watch("phone")}
              {...register("phone")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              value={watch("typePerson")}
              label={"Tipo de pessoa"}
              {...register("typePerson")}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};
