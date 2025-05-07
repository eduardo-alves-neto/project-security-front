"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Title } from "../../../components/v1/title"
import { Form } from "../../../components/v1/form"
import { useForm } from "react-hook-form"
import Grid from "@mui/material/Grid2"
import { TextField } from "@mui/material"
import type { ICollaborator } from "../services/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { collaboratorServices } from "../services/collaboratorServices"
import { enqueueSnackbar } from "notistack"
import { useNavigate, useParams } from "react-router"
import { useState } from "react"


export const CollaboratorFormView = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = params?.id
  const form = useForm<ICollaborator>()
  const { handleSubmit, register, watch } = form
  const [oldValues, setOldValues] = useState<ICollaborator>({} as ICollaborator)

  const { mutateAsync } = useMutation({
    mutationFn: async (values: ICollaborator) => {
      if (id) {
        await collaboratorServices.update(id, values)
      } else {
        await collaboratorServices.create(values)
      }
    },
    onSuccess: () => {
      enqueueSnackbar(`Colaborador ${id ? "atualizado" : "criado"} com sucesso`, {
        variant: "success",
      })
      navigate(-1)
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || `Erro ao ${id ? "atualizar" : "criar"} colaborador`, {
        variant: "error",
      })
    },
  })

  const { isLoading } = useQuery({
    queryKey: ["collaborator", id],
    enabled: !!id,
    queryFn: async () => {
      const data = await collaboratorServices.getById(id!)
      form.reset(data)
      setOldValues(data)
    },
  })

  const onSubmit = async ({ values }: { values: ICollaborator }) => {
    await mutateAsync(values)
  }

  return (
    <>
      <Title
        title="Colaboradores"
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
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              required
              fullWidth
              size="small"
              label={"Nome"}
              value={watch("name")}
              {...register("name", { required: true })}
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
              value={watch("phone")}
              {...register("phone")}
            />
          </Grid>
        </Grid>
      </Form>
    </>
  )
}
