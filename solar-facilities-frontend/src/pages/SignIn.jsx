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

export const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const { handleLoginUser, error, loading } = useAuthContext();

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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLoginUser)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            autoFocus
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
          {error && <Alert type="error" text="Invalid credentials" />}
          {loading && <Loading />}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
