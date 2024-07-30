import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { Alert } from "../components/Alert";
import { ROUTES } from "../util/routes";
import { Loading } from "../components/Loading";

export const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const { handleRegisterUser, error, loading } = useAuthContext();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegisterUser)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            placeholder="John Doe"
            type="text"
            autoFocus
            {...register("name", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            placeholder="john@doe.com"
            type="email"
            {...register("email", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
          {error && <Alert type="error" text="There was an error, try later" />}
          {loading && <Loading />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link to={ROUTES.LOGIN}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
