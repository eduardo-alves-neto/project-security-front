import { Title } from "../../../components/v1/title";
import { Form } from "../../../components/v1/form";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { ICustomer } from "../services/types";

export const CustomerFormView = () => {
  const form = useForm<ICustomer>();
  const { handleSubmit } = form;

  const onSubmit = ({ values }: { values: ICustomer }) => {
    console.log(values);
  };

  return (
    <>
      <Title
        title="Clientes"
        buttonTitle="Salvar"
        breadcrumbs={[{ label: "lista", path: -1 }, { label: "criar" }]}
      />

      <Form
        onHandleSubmit={handleSubmit}
        onSubmit={onSubmit}
        values={form.getValues()}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField label={"Nome"} fullWidth size="small" />
          </Grid>
        </Grid>
      </Form>

      {/* <Card variant="outlined" sx={{ padding: 2, width: "100%" }}>
        
      </Card> */}
    </>
  );
};
