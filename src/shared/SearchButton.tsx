import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

export const SearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: "#eee",
  color: "#000",
  padding: "8px 16px",
  borderRadius: "",
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  height: "40px",
}));
