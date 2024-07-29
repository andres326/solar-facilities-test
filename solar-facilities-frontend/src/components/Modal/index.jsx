import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const BasicModal = ({
  open,
  handleClose,
  children,
  modalTitle = null,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {modalTitle && (
          <Typography
            variant="h4"
            gutterBottom
            paddingBottom={2}
            marginBottom={3}
            borderBottom={"solid 1px #f5f5f5"}
          >
            {modalTitle}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};
