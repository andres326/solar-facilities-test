import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = ({ onDelete }) => [
  { field: "id", headerName: "ID", width: 200, flex: 1 },
  {
    field: "name",
    headerName: "Facility name",
    minWidth: 80,
    flex: 1,
  },
  {
    field: "power",
    headerName: "Facility power",
    minWidth: 80,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 80,
    flex: 1,
    renderCell: (params) => {
      return (
        <IconButton onClick={() => onDelete(params.row)}>
          <DeleteIcon />
        </IconButton>
      );
    },
  },
];

export const FacilityTable = ({ facilities, onDelete }) => {
  const [rows, setRows] = useState(facilities);

  return (
    <Box sx={{ height: 500, width: "99%" }}>
      <DataGrid
        rows={facilities}
        columns={columns({ onDelete })}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
