/* eslint-disable @typescript-eslint/no-explicit-any */
import { Title } from "../../../components/v1/title";
import { Form } from "../../../components/v1/form";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IOccurrence } from "../services/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { occurrenceServices } from "../services/occurrenceServices";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import dayjs from "dayjs";

export const OccurrenceFormView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;
  const form = useForm<IOccurrence>();
  const { handleSubmit, register, watch } = form;
  const [oldValues, setOldValues] = useState<IOccurrence>({} as IOccurrence);

  const { mutateAsync } = useMutation({
    mutationFn: async (values: IOccurrence) => {
      if (id) {
        await occurrenceServices.update(id, values);
      } else {
        await occurrenceServices.create(values);
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
    queryKey: ["occurrence", id],
    enabled: !!id,
    queryFn: async () => {
      const data = await occurrenceServices.getById(id!);
      form.reset(data);
      setOldValues(data);
    },
  });

  const { isLoading: isLoadingCollaborator, data: collaboratorData } = useQuery(
    {
      queryKey: ["collaborator"],
      queryFn: async () => {
        const data = await occurrenceServices.getCollaborators();
        return data;
      },
    }
  );

  const { isLoading: isLoadingCustomer, data: customerData } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      const data = await occurrenceServices.getCustomers();
      return data;
    },
  });

  const onSubmit = async ({ values }: { values: IOccurrence }) => {
    await mutateAsync(values);
  };

  return (
    <>
      <Title
        title="Ocorrências"
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
        <Grid container spacing={2} mt={1.5}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              size="small"
              label={"Descrição"}
              value={watch("description")}
              {...register("description", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              label={"Data de ocorrência"}
              value={
                watch("occurrenceDate")
                  ? dayjs.utc(watch("occurrenceDate")).format("YYYY-MM-DD")
                  : ""
              }
              {...register("occurrenceDate", { required: true })}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-id-collaborator" required>
                {"Colaborador"}
              </InputLabel>
              <Select
                id="select-id-collaborator"
                value={watch("collaboratorId")}
                label={"Colaborador"}
                size="small"
                fullWidth
                required
                disabled={isLoadingCollaborator}
                onChange={(e) => {
                  form.setValue("collaboratorId", e.target.value);
                  const collaboratorName = collaboratorData?.find(
                    (collaborator: any) => collaborator._id === e.target.value
                  )?.name;

                  form.setValue("collaboratorName", collaboratorName);
                }}
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                {collaboratorData?.map((collaborator: any) => (
                  <MenuItem key={collaborator._id} value={collaborator._id}>
                    {collaborator.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-id-customer" required>
                {"Cliente"}
              </InputLabel>
              <Select
                id="select-id-customer"
                value={watch("customerId")}
                label={"Cliente"}
                size="small"
                fullWidth
                required
                disabled={isLoadingCustomer}
                onChange={(e) => {
                  form.setValue("customerId", e.target.value);
                  const customerName = customerData?.find(
                    (customer: any) => customer._id === e.target.value
                  )?.name;

                  form.setValue("customerName", customerName || "");
                }}
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                {customerData?.map((customer: any) => (
                  <MenuItem key={customer._id} value={customer._id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              rows={4}
              label={"Detalhes"}
              InputLabelProps={{ shrink: true }}
              multiline
              value={watch("details")}
              {...register("details", { required: true })}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  );
};
