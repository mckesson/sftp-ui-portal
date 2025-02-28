import { Box, Divider, styled } from "@mui/material";

export const Separator = styled(Divider)({
  marginBottom: "25px",
});

export const NoDataFound = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#00000061",
  fontSize: "24px",
});
