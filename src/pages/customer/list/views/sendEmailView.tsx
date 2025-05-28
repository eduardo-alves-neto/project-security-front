/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { customerServices } from "../../services/customerServices";
import { enqueueSnackbar } from "notistack";

export interface IEmailForm {
  to: string;
  subject: string;
  text: string;
}

export const SendEmailView = () => {
  const params = useParams();
  const id = params?.id;

  const form = useForm<IEmailForm>({
    defaultValues: {
      to: "",
      subject: "",
      text: "",
    },
  });

  const { handleSubmit, register, setValue } = form;


  const { isLoading: isFetchingEmail } = useQuery({
    queryKey: ["customer", id],
    enabled: !!id,
    queryFn: async () => {
      const data = await customerServices.getById(id!);
      setValue("to", data.email); 
    },
  });

  // Mutation to send email
  const { mutate: sendEmail, isPending: isSendingEmail } = useMutation({
    mutationFn: async (emailData: IEmailForm) => {
      const response = await customerServices.notify(emailData);
      return response;
    },
    onSuccess: (data) => {
      enqueueSnackbar(data.message || "Email enviado com sucesso", {
        variant: "success",
      });
    },
    onError: (error: any) => {
      console.error(error);
      enqueueSnackbar("Erro ao enviar e-mail", {
        variant: "error",
      });
    },
  });

  const onSubmit = (data: IEmailForm) => {
    sendEmail(data);
  };

  return (
    <Box p={4} position="relative">
      {isSendingEmail && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(255, 255, 255, 0.8)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={10}
        >
          <CircularProgress />
        </Box>
      )}
      <Typography variant="h4" mb={3}>
        Enviar e-mail para cliente
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Para"
            InputLabelProps={{ shrink: true }}
            {...register("to")}
            fullWidth
            disabled={isFetchingEmail || isSendingEmail}
          />
          <TextField
            label="Assunto"
            {...register("subject")}
            fullWidth
            disabled={isSendingEmail}
          />
          <TextField
            label="Mensagem"
            {...register("text")}
            fullWidth
            multiline
            rows={4}
            disabled={isSendingEmail}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSendingEmail}
          >
            {isSendingEmail ? "Enviando..." : "Enviar"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
