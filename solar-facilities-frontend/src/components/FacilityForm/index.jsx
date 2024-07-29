import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export const FacilityForm = ({
  onSubmit,
  isEditing = false,
  values = null,
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
    </Grid>
  );
};
