import {
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  styled,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "600px",
});

export const SuccessIcon = styled(CheckCircleOutline)({
  fontSize: "50px",
  color: "#2dad07",
  marginTop: "10px !important",
});

export const ModalIcon = styled(ErrorOutline)({
  fontSize: "50px !important",
  color: "#FF0000",
  marginTop: "10px !important",
});

export const StyledDialogActions = styled(DialogActions)({
  display: "flex !important",
  justifyContent: "center !important",
  marginBottom: "2px",
});

export const StyledDialogContentText = styled(DialogContentText)({
  marginTop: "20px !important",
  fontSize: "1rem !important",
  textAlign: "center",
  marginBottom: "10px",
});

export const CancelButton = styled(Button)({
  color: "#000000de !important",
  backgroundColor: "#ccc !important",
  border: "1px solid #bbb",
});

export const ConfirmButton = styled(Button)({
  color: "#FFF !important",
  backgroundColor: "#2dad07 !important",
  border: "1px solid #248c06",
});
