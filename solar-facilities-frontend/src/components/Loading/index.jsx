import { Box, CircularProgress } from "@mui/material";

const defaultClassNames = { display: "flex", justifyContent: "center" };

export const Loading = ({ classNames = defaultClassNames }) => {
  return (
    <Box sx={{ ...classNames }}>
      <CircularProgress />
    </Box>
  );
};
