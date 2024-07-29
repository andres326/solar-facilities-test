import { Box, Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FacilityTable } from "../components/FacilityTable";
import { DrawerHeaderStyled } from "../components/Drawer/drawer-components";
import { useCreateFacility } from "../graphql/hooks/facilities";
import { BasicModal } from "../components/Modal";
import { useState } from "react";
import { FacilityForm } from "../components/FacilityForm";
import { useShowAlert } from "../hooks/useShowAlert";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { createFacility } = useCreateFacility();

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setSuccess(false);
    setError(false);
  };

  const { success, error, setSuccess, setError } =
    useShowAlert(handleCloseModal);

  const handleCreateFacility = async ({ name, power }) => {
    try {
      await createFacility({ name, power: parseInt(power) });
      setSuccess(true);
    } catch {
      setError(true);
    }
  };

  return (
    <Box component="main" width={"100%"}>
      <DrawerHeaderStyled />
      <Grid container direction="column" spacing={2} component={"main"} p={2}>
        <Grid
          item
          container
          component={"section"}
          direction="row"
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add Facility
          </Button>
          <BasicModal
            open={open}
            handleClose={handleCloseModal}
            modalTitle={"Add new Facility"}
          >
            <FacilityForm
              onSubmit={handleCreateFacility}
              success={success}
              error={error}
            />
          </BasicModal>
        </Grid>
        <Grid item>
          <FacilityTable />
        </Grid>
      </Grid>
    </Box>
  );
};
