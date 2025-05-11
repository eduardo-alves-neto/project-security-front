import { useNavigate } from "react-router";
import { Title } from "../../../../components/v1/title";
import { LayoutListTable } from "../../../../components/v1/ListTable";
import { ListViewModel } from "../types";
import { collaboratorRoutes } from "../../constants/routes";

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
        title="Colaboradores"
        buttonTitle="Adicionar colaborador"
        breadcrumbs={[{ label: "Colaboradores" }]}
        onNewRegisterNavigate={() =>
          navigate(collaboratorRoutes.create(), { viewTransition: true })
        }
      />

      <LayoutListTable
        rows={rows}
        title="colaboradores"
        columns={Columns()}
        onDeleteRow={(row) => handlerDelete(row.id!)}
        optionsRow={[
          {
            label: "Editar",
            onClick: (row) => navigate(collaboratorRoutes.update(row.id)),
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
