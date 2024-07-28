import { Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export const DataForm = ({ onSubmit }) => {
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
          {...register("file", { required: true })}
        />
      </Grid>
      <Button type="submit" variant="contained">
        Upload
      </Button>
    </Grid>
  );
};
