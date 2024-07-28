import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  useDeleteFacility,
  useFacilities,
} from "../../graphql/hooks/facilities";
import { usePerformanceData } from "../../graphql/hooks/performance";
const columns = ({ onDelete, onViewData }) => [
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
        <Stack direction={"row"} alignItems={"center"} height={"100%"}>
          <IconButton onClick={() => onDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onViewData(params.row)}>
            <RemoveRedEyeIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

export const FacilityTable = () => {
  const { facilities } = useFacilities();
  const { deleteFacility } = useDeleteFacility();
  const { performanceData } = usePerformanceData("66a3f7b97b3fee4b2960b356");

  const onDelete = async ({ id }) => {
    await deleteFacility(id);
    console.log({ id });
  };

  const onViewData = async ({ id }) => {
    console.log({ performanceData });
  };

  return (
    <Box sx={{ height: 500, width: "99%" }}>
      <DataGrid
        rows={facilities}
        columns={columns({ onDelete, onViewData })}
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
