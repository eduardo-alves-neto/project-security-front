import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LayoutDefault } from "../layoutDefault";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "./services/loginServices";
import { useForm } from "react-hook-form";
import { ILogin } from "./types";

export const LoginComponent = () => {
  const form = useForm<ILogin>();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, senha }: { email: string; senha: string }) => {
      const data = await signIn(email, senha);
      console.log(data);
    },
  });

  const submit = async () => {
    await mutateAsync(form.getValues());
  };

  return (
    <LayoutDefault>
      <Stack
        p={10}
        sx={{
          height: "100dvh",
          flexDirection: "column",
          width: 700,
        }}
        justifyContent="center"
        border={1}
      >
        <form onSubmit={form.handleSubmit(submit)}>
          <Stack gap={2} mb={4}>
            <Typography variant={"h4"} fontWeight="bold">
              {"Login"}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Ainda não tem conta? <Link to={"/signup"}>Criar conta</Link>
            </Typography>
          </Stack>

          <Stack spacing={5} flex={0.3}>
            <TextField
              label="Email"
              size="medium"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              label="Senha"
              size="medium"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>

          <Box>
            <Button
              sx={{ borderRadius: 20, p: 2 }}
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
