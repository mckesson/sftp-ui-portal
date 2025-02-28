import { Dialog } from "@mui/material";
import { ExitToApp, DeleteForever, Info } from "@mui/icons-material";
import {
  CancelButton,
  ConfirmButton,
  ModalIcon,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogContentText,
  SuccessIcon,
} from "./style";

interface PopupProps {
  open: boolean;
  handleClose?: () => void;
  handleSuccess: () => void;
  body: string;
  confirmButton: string;
  cancelButton: string;
  success?: boolean;
  warning?: boolean;
  logout?: boolean;
  close?: boolean;
  copy?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  open,
  handleClose,
  handleSuccess,
  body,
  confirmButton,
  cancelButton,
  success,
  warning,
  logout,
  close,
  copy,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogContent>
        {success ? (
          <SuccessIcon />
        ) : warning ? (
          <ModalIcon />
        ) : logout ? (
          <ExitToApp fontSize="large" color="error" />
        ) : copy ? (
          <Info fontSize="large" color="primary" />
        ) : (
          <DeleteForever fontSize="large" color="error" />
        )}
        <StyledDialogContentText id="alert-dialog-description">
          {body}
        </StyledDialogContentText>
      </StyledDialogContent>
      {copy ? (
        <StyledDialogActions>
          <CancelButton onClick={handleClose}>{cancelButton}</CancelButton>
          <ConfirmButton onClick={handleSuccess}>{confirmButton}</ConfirmButton>
        </StyledDialogActions>
      ) : (
        <StyledDialogActions>
          <ConfirmButton onClick={handleSuccess}>{confirmButton}</ConfirmButton>
          {close && (
            <CancelButton onClick={handleClose}>{cancelButton}</CancelButton>
          )}
        </StyledDialogActions>
      )}
    </Dialog>
  );
};

export default Popup;
