import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
  minWidth: "100vw",
  minHeight: "100vh",
  backgroundColor: theme.palette.primary.main,
}));
