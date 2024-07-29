import { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { BasicModal } from "../Modal";
import { DataForm } from "../DataForm";
import { FacilityForm } from "../FacilityForm";
import {
  useDeleteFacility,
  useUpdateFacility,
} from "../../graphql/hooks/facilities";
import { uploadFile } from "../../services/file";
import { useShowAlert } from "../../hooks/useShowAlert";
import { BasicDialog } from "../Dialog";

export const FacilityActions = ({ row }) => {
  const { deleteFacility } = useDeleteFacility();
  const { updateFacility } = useUpdateFacility();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenDialog(false);
    setSuccess(false);
    setError(false);
    if (isEditing) {
      setEditing(false);
    }
  };

  const { success, error, setSuccess, setError } =
    useShowAlert(handleCloseModal);

  const handleEdit = () => {
    setEditing(true);
    handleOpenModal();
  };

  const onDelete = async () => {
    const { id } = row;
    try {
      await deleteFacility(id);
    } catch {
      setError(true);
    }
  };

  const onView = async () => {
    const { id } = row;
    navigate(`/facility/${id}`);
  };

  const onUpload = async (data) => {
    const { id } = row;
    const { file } = data;
    try {
      await uploadFile({ file: file[0], id });
      setSuccess(true);
    } catch {
      setError(true);
    }
  };

  const onEdit = async ({ name, power }) => {
    try {
      await updateFacility({ id: row.id, name, power: parseInt(power) });
      setSuccess(true);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} height={"100%"}>
        <IconButton onClick={onView}>
          <RemoveRedEyeIcon />
        </IconButton>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleOpenModal}>
          <FileUploadIcon />
        </IconButton>
        <IconButton onClick={handleOpenDialog}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <BasicModal
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={isEditing ? "Edit facility" : "Upload CSV file"}
      >
        {!isEditing && (
          <DataForm onSubmit={onUpload} success={success} error={error} />
        )}
        {isEditing && (
          <FacilityForm
            onSubmit={onEdit}
            isEditing
            values={{ name: row.name, power: row.power }}
            success={success}
            error={error}
          />
        )}
      </BasicModal>
      <BasicDialog
        open={openDialog}
        handleClose={handleCloseModal}
        handleAction={onDelete}
        title={"Erase Facility?"}
        content={"All data will be eliminated and you can not see it again"}
        action={"Delete"}
        error={error}
      />
    </>
  );
};
