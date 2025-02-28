import React from "react";
import { Modal as MuiModal, Box, Typography } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  description?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  width,
}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width || "600px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: "10px",
          borderRadius: 2,
        }}
      >
        {title && (
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        {description && (
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
