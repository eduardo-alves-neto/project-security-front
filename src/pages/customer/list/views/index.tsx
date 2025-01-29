import { useNavigate } from "react-router";
import { Title } from "../../../../components/v1/title";
import { LayoutListTable } from "../../../../components/v1/ListTable";
import { ListViewModel } from "../types";
import { customerRoutes } from "../../constants/routes";

export const ListView = ({
  page,
  rows,
  rowsLength,
  rowsPerPage,
  isLoading,
  Columns,
  handlerDelete,
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
          navigate(customerRoutes.create(), { viewTransition: true })
        }
      />

      <LayoutListTable
        rows={rows}
        title="clientes"
        columns={Columns()}
        onDeleteRow={(row) => handlerDelete(row.id)}
        optionsRow={[
          {
            label: "Editar",
            onClick: (row) => navigate(customerRoutes.update(row.id)),
          },
        ]}
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
