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
        await customerServices.update(id, values);
      } else {
        await customerServices.create(values);
      }
    },
    onSuccess: () => {
      enqueueSnackbar(`Cliente ${id ? "atualizado" : "criado"} com sucesso`, {
        variant: "success",
      });
      navigate(-1);
    },
    onError: (error: any) => {
      enqueueSnackbar(
        error.response?.data?.message ||
          `Erro ao ${id ? "atualizar" : "criar"} cliente`,
        { variant: "error" }
      );
    },
  });

  const { isLoading } = useQuery({
    queryKey: ["customer", id],
    enabled: !!id,
    queryFn: async () => {
      const data = await customerServices.getById(id!);
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
        breadcrumbs={[
          { label: "lista", path: -1 },
          { label: id ? "editar" : "criar" },
        ]}
      />

      <Form
        onHandleSubmit={handleSubmit}
        onSubmit={onSubmit}
        values={watch()}
        oldValues={oldValues}
        isLoading={isLoading}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              size="small"
              label={"Nome"}
              value={watch("nome")}
              {...register("nome", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              size="small"
              label={"CPF"}
              value={watch("cpf")}
              {...register("cpf", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              size="small"
              type="email"
              label={"Email"}
              value={watch("email")}
              {...register("email", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              type="tel"
              size="small"
              label={"Telefone"}
              value={watch("telefone")}
              {...register("telefone", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <TextField
              fullWidth
              size="small"
              label={"Endereço"}
              value={watch("endereco.rua")}
              {...register("endereco.rua")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={"Número"}
              value={watch("endereco.numero")}
              {...register("endereco.numero")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={"Complemento"}
              value={watch("endereco.complemento")}
              {...register("endereco.complemento")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={"Bairro"}
              value={watch("endereco.bairro")}
              {...register("endereco.bairro")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={"Cidade"}
              value={watch("endereco.cidade")}
              {...register("endereco.cidade")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={"Estado"}
              value={watch("endereco.estado")}
              {...register("endereco.estado")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={"CEP"}
              value={watch("endereco.cep")}
              {...register("endereco.cep")}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};
