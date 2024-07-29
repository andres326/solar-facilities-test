import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Alert } from "../Alert";

export const FacilityForm = ({
  onSubmit,
  isEditing = false,
  values = null,
  success = false,
  error = false,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <Grid
      component={"form"}
      container
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item container gap={1}>
        <TextField
          required
          label="Facility name"
          {...register("name", {
            required: true,
            value: values ? values.name : "",
          })}
        />
        <TextField
          required
          label="Power"
          type="number"
          inputProps={{ min: 0 }}
          {...register("power", {
            required: true,
            min: 0,
            value: values ? values.power : "",
          })}
        />
      </Grid>
      <Button type="submit" variant="contained">
        {isEditing ? "Update" : "Create"}
      </Button>
      {success && <Alert text="Succesfully done!" />}
      {error && (
        <Alert type="error" text="There was something wrong, try later!" />
      )}
    </Grid>
  );
};
