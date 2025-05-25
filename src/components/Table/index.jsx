import React, { useState } from "react";

import { PiBracketsSquareLight } from "react-icons/pi";
import { FilterTable, StyledTable } from './style';

import DataTable from "react-data-table-component";

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};
// eslint-disable-next-line react/prop-types
export default function Table({ columns, data = [], inputFilter = true }) {
  const [filter, setFilter] = useState('');
  const results = filter == '' ? data : data.filter(e => {
    return Object.values(e).join('_').toLowerCase().search(filter.toLowerCase()) != -1;
  })
  return (
    <>
      {inputFilter &&  (<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <FilterTable defaultValue={filter} onChange={({ target }) => setFilter(target.value)} />
      </div>)}
      <DataTable
        columns={columns}
        data={results}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        searchable
        paginationComponentOptions={paginationComponentOptions}
        noDataComponent={<><PiBracketsSquareLight size={32} style={{ marginRight: 16 }} /> Nenhum registro encontrado.</>}
      />
    </>
  );
}