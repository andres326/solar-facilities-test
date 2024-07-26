import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateFacility } from "../../graphql/hooks";

export const FacilityForm = ({ onSubmit }) => {
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
          id="name"
          label="Facility name"
          {...register("name", { required: true })}
        />
        <TextField
          required
          id="power"
          label="Power"
          type="number"
          inputProps={{ min: 0 }}
          {...register("power", { required: true, min: 0 })}
        />
      </Grid>
      <Button type="submit" variant="contained">
        Create
      </Button>
    </Grid>
  );
};
