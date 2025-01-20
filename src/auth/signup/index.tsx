import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LayoutDefault } from "../layout-default";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { ISignup, SignUp } from "./services/signupServices";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useSession } from "../../contexts/sessionContext";
import { schema } from "./schema";
import { joiResolver } from "@hookform/resolvers/joi";

export const SignUpComponent = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  if (session) navigate("main/home");

  const form = useForm<ISignup>({
    resolver: joiResolver(schema),
    mode: "onBlur",
  });
  const {
    register,
    formState: { errors },
  } = form;

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await SignUp.post({ email, password });
      if (res.error) enqueueSnackbar(res.error.message, { variant: "error" });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

  const submit = async () => {
    await mutateAsync(form.getValues());
  };

  return (
    <LayoutDefault>
      <Stack
        p={{ xs: 5, sm: 10, md: 2, lg: 10, xl: 10 }}
        sx={{
          height: "100dvh",
          flexDirection: "column",
          width: 700,
        }}
        justifyContent="center"
      >
        <form onSubmit={form.handleSubmit(submit)}>
          <Stack gap={2} mb={4}>
            <Typography variant={"h4"} fontWeight="bold">
              {"Cadastro"}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {"Já tem uma conta? "}
              <Link to={"/auth/sign-in"}>Entrar</Link>
            </Typography>
          </Stack>

          <Stack spacing={5} pb={3}>
            <TextField
              label="Email"
              size="medium"
              fullWidth
              {...register("email", {
                required: "Campo obrigatório",
              })}
              helperText={errors.email?.message}
              error={!!errors.email?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              label="Senha"
              size="medium"
              fullWidth
              {...register("password", {
                required: "Campo obrigatório",
              })}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>

          <Box>
            <Button
              sx={{ borderRadius: 3, p: 2 }}
              size="medium"
              fullWidth
              variant="contained"
              type="submit"
            >
              Cadastrar
            </Button>
          </Box>
        </form>
      </Stack>
    </LayoutDefault>
  );
};
