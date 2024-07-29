import { Alert as MuiAlert } from "@mui/material";

export const Alert = ({ type = "success", text = "Nice job!" }) => {
  return <MuiAlert severity={type}>{text}</MuiAlert>;
};
