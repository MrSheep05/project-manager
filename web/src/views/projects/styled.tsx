import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  maxWidth: "80vw",
});

export const StyledList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

export const StyledRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
  alignItems: "center",
  maxWidth: "76vw",
  flex: 1,
  paddingTop: "2vmin",
});

export const StyledRowList = styled(Box)({
  display: "flex",
  flexDirection: "row",
  overflow: "auto",
  gap: "2vmin",
  flex: 1,
  height: "100%",
  maxHeight: "62vh",
  paddingBottom: "2vmin",
});

export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2vmin",
  height: "100%",
});
