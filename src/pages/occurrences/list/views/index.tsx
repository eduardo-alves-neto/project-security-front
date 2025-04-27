import { useNavigate } from "react-router";
import { Title } from "../../../../components/v1/title";
import { LayoutListTable } from "../../../../components/v1/ListTable";
import { ListViewModel } from "../types";
import { occurrenceRoutes } from "../../constants/routes";

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
        title="Occorrências"
        buttonTitle="Adicionar ocorrência"
        breadcrumbs={[{ label: "Occorrências" }]}
        onNewRegisterNavigate={() =>
          navigate(occurrenceRoutes.create(), { viewTransition: true })
        }
      />

      <LayoutListTable
        rows={rows}
        title="Occorrências"
        columns={Columns()}
        onDeleteRow={(row) => handlerDelete(row.id!)}
        optionsRow={[
          {
            label: "Editar",
            onClick: (row) => navigate(occurrenceRoutes.update(row.id)),
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
