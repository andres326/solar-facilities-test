import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Alert } from "../Alert";

export const DataForm = ({ onSubmit, success = false, error = false }) => {
  const { register, handleSubmit } = useForm();

  return (
    <Grid
      component={"form"}
      container
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item container>
        <TextField
          required
          id="file"
          type="file"
          inputProps={{ accept: ".csv" }}
          {...register("file", { required: true })}
        />
      </Grid>
      <Button type="submit" variant="contained">
        Upload
      </Button>
      {success && <Alert text="Succesfully done!" />}
      {error && (
        <Alert type="error" text="There was something wrong, try later!" />
      )}
    </Grid>
  );
};
