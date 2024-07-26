import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useFacilities } from "../../graphql/hooks";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Facility name",
    width: 150,
  },
  {
    field: "power",
    headerName: "Facility power",
    width: 150,
  },
];

export const FacilityTable = ({ facilities }) => {
  const [rows, setRows] = useState(facilities);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={facilities}
        columns={columns}
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
