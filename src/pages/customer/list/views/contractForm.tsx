import { Title } from "../../../../components/v1/title";
import { Form } from "../../../../components/v1/form";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { ICustomer } from "../../services/types";
import { useQuery } from "@tanstack/react-query";
import { customerServices } from "../../services/customerServices";
import { useParams } from "react-router";
import { generateContractPdf } from "../utils/generateContractPdf";
import { initialValues } from "../constants/contractInitialValues";

export const ContractFormView = () => {
  const params = useParams();
  const id = params?.id;
  const form = useForm<ICustomer>({
    defaultValues: {
      Contract: { ...initialValues },
    },
  });
  const { handleSubmit, register, watch } = form;

  const { isLoading } = useQuery({
    queryKey: ["customer", id],
    enabled: !!id,
    queryFn: async () => {
      const data = await customerServices.getById(id!);
      form.reset({ ...data, Contract: { ...initialValues } });
    },
  });

  return (
    <>
      <Title
        title="Contrato"
        hideTitleButton
        breadcrumbs={[{ label: "Clientes", path: -1 }, { label: "contrato" }]}
      />

      <Form
        onHandleSubmit={handleSubmit}
        values={watch()}
        isLoading={isLoading}
        submitButton={{
          buttonLabel: "Imprimir",
          onClick() {
            const data = form.getValues();
            generateContractPdf(data);
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              size="small"
              label="Título"
              value={watch("Contract.title")}
              {...register("Contract.title", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              required
              fullWidth
              size="small"
              label="Descrição"
              value={watch("Contract.description")}
              {...register("Contract.description")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              required
              fullWidth
              size="small"
              type="date"
              label="Data de Início"
              InputLabelProps={{ shrink: true }}
              value={watch("Contract.startDate")}
              {...register("Contract.startDate", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Data de Término"
              InputLabelProps={{ shrink: true }}
              value={watch("Contract.endDate")}
              {...register("Contract.endDate")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              required
              fullWidth
              size="small"
              type="number"
              label="Valor"
              value={watch("Contract.value")}
              {...register("Contract.value", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              required
              fullWidth
              size="small"
              select
              label="Status"
              SelectProps={{ native: true }}
              value={watch("Contract.status")}
              {...register("Contract.status", { required: true })}
            >
              <option value="ativo">Ativo</option>
              <option value="pendente">Pendente</option>
              <option value="cancelado">Cancelado</option>
              <option value="expirado">Expirado</option>
            </TextField>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};
