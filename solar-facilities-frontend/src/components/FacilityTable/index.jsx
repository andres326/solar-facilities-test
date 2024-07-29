import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useFacilities } from "../../graphql/hooks/facilities";
import { FacilityActions } from "../FacilityActions";

const columns = [
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
      return <FacilityActions row={params.row} />;
    },
  },
];

export const FacilityTable = () => {
  const { facilities } = useFacilities();

  return (
    <Box sx={{ height: 500, width: "99%" }}>
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
