import { CircularProgress, Backdrop as MuiBackdrop } from "@mui/material";

interface BackdropProps {
  open: boolean;
  handleClose?: () => void;
}

const Backdrop = ({ open, handleClose }: BackdropProps) => {
  return (
    <MuiBackdrop
      sx={(theme: any) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
