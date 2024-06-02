import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  maxWidth: "79vw",
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

export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2vmin",
  height: "100%",
});

export const StyledLoadingProject = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "2vmin",
  width: "45vmin",
  flex: 1,
  backgroundColor: theme.palette.shadow[theme.palette.mode],
  color: "black",
  padding: "1vmin",
}));
