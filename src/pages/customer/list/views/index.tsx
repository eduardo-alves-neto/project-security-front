import { useNavigate } from "react-router";
import { Title } from "../../../../components/v1/title";
import { LayoutListTable } from "../../../../components/v1/ListTable";
import { ListViewModel } from "../types";
import { routes } from "../../constants/routes";

export const ListView = ({
  page,
  rows,
  rowsLength,
  rowsPerPage,
  isLoading,
  Columns,
  handleChangePage,
  handleChangeRowsPerPage,
}: ListViewModel) => {
  const navigate = useNavigate();
  return (
    <>
      <Title
        title="Clientes"
        buttonTitle="Adicionar cliente"
        breadcrumbs={[{ label: "Clientes" }]}
        onNewRegisterNavigate={() =>
          navigate(routes.create(), { viewTransition: true })
        }
      />

      <LayoutListTable
        rows={rows}
        title="clientes"
        columns={Columns()}
        optionsRow={[{ label: "teste", onClick: () => console.log("test") }]}
        pagination={{
          rowsLength,
          rowsPerPage,
          page,
          onPageChange: handleChangePage,
          onRowsPerPageChange: handleChangeRowsPerPage,
        }}
        isLoading={isLoading}
      />
    </>
  );
};
