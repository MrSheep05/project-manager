import { Box, Paper, styled } from "@mui/material";

export const StyledRowList = styled(Box)({
  display: "flex",
  flexDirection: "row",
  overflow: "auto",
  height: "100%",
  //   gap: "2vmin",
  //   flex: 1,
  //   maxHeight: "62vh",
  //   paddingBottom: "2vmin",
});

export const StyledColumnList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  width: "100%",
});

export const StyledIntersection = styled(Paper)({
  backgroundColor: "transparent",
  maxHeight: "1px",
  minHeight: "1px",
  maxWidth: "1px",
  minWidth: "1px",
  margin: "2px",
  alignSelf: "center",
  justifySelf: "center",
});
