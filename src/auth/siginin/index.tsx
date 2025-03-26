import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LayoutDefault } from "../layout-default";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ISignIn } from "../services/auth";
import { enqueueSnackbar } from "notistack";
import { useSession } from "../../contexts/sessionContext";
import { schema } from "./schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";
import { authService } from "../services/auth";

export const SignInComponent = () => {
  const { isAuthenticated } = useSession();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/home");
  // }, [isAuthenticated, navigate]);

  const form = useForm<ISignIn>({
    resolver: joiResolver(schema),
    mode: "onBlur",
  });

  const {
    register,
    formState: { errors },
  } = form;

  const { mutateAsync } = useMutation({
    mutationFn: async (data: ISignIn) => {
      const response = await authService.signIn(data);
      authService.setToken(response.token);
      return response;
    },
    onSuccess: () => {
      enqueueSnackbar("Login realizado com sucesso", { variant: "success" });
      navigate("/home");
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || "Erro ao fazer login", { variant: "error" });
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
              {"Login"}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Ainda não tem conta? <Link to={"/auth/sign-up"}>Criar conta</Link>
            </Typography>
          </Stack>

          <Stack spacing={5} pb={3}>
            <TextField
              label="Email"
              size="medium"
              fullWidth
              {...register("email")}
              helperText={errors.email?.message}
              error={!!errors.email?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              label="Senha"
              type="password"
              size="medium"
              fullWidth
              {...register("senha")}
              helperText={errors.senha?.message}
              error={!!errors.senha?.message}
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
              Entrar
            </Button>
          </Box>
        </form>
      </Stack>
    </LayoutDefault>
  );
};
