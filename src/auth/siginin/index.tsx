import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LayoutDefault } from "../layout-default";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { SignIn } from "./services/signinServices";
import { useForm } from "react-hook-form";
import { ISignin } from "./services/signinServices";
import { enqueueSnackbar } from "notistack";
import { useSession } from "../../contexts/sessionContext";
import { schema } from "./schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";

export const SignInComponent = () => {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) navigate("/home");
  }, [session, navigate]);

  const form = useForm<ISignin>({
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
      const res = await SignIn.post({ email, password });
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
              size="medium"
              fullWidth
              {...register("password")}
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
              Entrar
            </Button>
          </Box>
        </form>
      </Stack>
    </LayoutDefault>
  );
};
