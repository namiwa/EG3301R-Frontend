import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'date', headerName: 'Date', type: 'date', width: 130 },
  { field: 'location', headerName: 'Coordinates', width: 130 },
  { field: 'energyType', headerName: 'Energy Type', width: 130 },
  {
    field: 'predVal',
    headerName: 'Predicted Output',
    type: 'number',
    width: 150,
  },
  {
    field: 'turbineType',
    headerName: 'Turbine Type',
    width: 150,
  },
];

export default function DataTable(trying) {
  return (
    <Paper style={{ height: 380, width: '100%', backgroundColor: 'white' }}>
      <DataGrid
        rows={trying.rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Paper>
  );
}
