import React from "react";

import TableV2 from "../../../../components/TableV2";
import { deleteEstoque } from "../../../../services/estoque";
import { confirmAlert } from "../../../../utils/alert";
import { formatDate } from "../../../../utils/dateHelper";
import { Button } from './style';


export default function KitTable({ data = [], handleEdit, refresh, totalRows }) {

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Tem certeza disso?',
      text: "O registro será inativado!",
      handleFunction: async () => {await deleteEstoque(id); await refresh();},
    })
  }

  const columns = [
    {
      name: 'Ações',
      cell: ({ id_combo }) => (
        <div>
          <Button onClick={() => handleEdit(id_combo)}>Editar</Button>
          <Button onClick={() => handleDelete(id_combo)}>Excluir</Button>
        </div>
      ),
    },
    {
      name: "ID",
      selector: ({ id_combo }) => `${id_combo}`,
      sortable: true,
    },
    {
      name: "Descrição",
      selector: ({ desc_combo }) => `${desc_combo}`,
      sortable: true,
    },
    {
      name: "Centro de Custo",
      selector: ({ des_centro_custo_cco }) => `${des_centro_custo_cco}`,
      sortable: true,
    },
    {
      name: "Data de Cadastro",
      selector: ({ created_at }) => `${created_at}`,
      sortable: true,
      format: ({ created_at }) => formatDate(created_at),
    },
  ];
  return (
    <TableV2
      columns={columns}
      totalRows={totalRows}
      data={data}
      fetchData={refresh}
    />
  )
}