import {
  Dialog as MuiDialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { Alert } from "../Alert";

export const BasicDialog = ({
  open,
  handleClose,
  handleAction,
  title = null,
  content = null,
  action = null,
  error = false,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
      )}
      {error && (
        <Alert type="error" text="There was something wrong try later" />
      )}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {action && (
          <Button onClick={handleAction} autoFocus>
            {action}
          </Button>
        )}
      </DialogActions>
    </MuiDialog>
  );
};
