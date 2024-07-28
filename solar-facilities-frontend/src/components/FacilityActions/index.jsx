import { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import { BasicModal } from "../Modal";
import { DataForm } from "../DataForm";
import { useNavigate } from "react-router-dom";
import { useDeleteFacility } from "../../graphql/hooks/facilities";
import { uploadFile } from "../../services/file";

export const FacilityActions = ({ row }) => {
  const { deleteFacility } = useDeleteFacility();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const onDelete = async () => {
    const { id } = row;
    await deleteFacility(id);
    console.log({ id });
  };

  const onView = async () => {
    const { id } = row;
    navigate(`/facility/${id}`);
  };

  const onUpload = async (data) => {
    const { id } = row;
    const { file } = data;
    await uploadFile({ file: file[0], id });
    handleCloseModal();
  };

  const onEdit = () => {};

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} height={"100%"}>
        <IconButton onClick={onView}>
          <RemoveRedEyeIcon />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleOpenModal}>
          <FileUploadIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <BasicModal open={open} handleClose={handleCloseModal}>
        <DataForm onSubmit={onUpload} />
      </BasicModal>
    </>
  );
};
