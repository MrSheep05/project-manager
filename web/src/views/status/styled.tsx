import { Box, styled } from "@mui/material";

export const StyledRow = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  gap: "1vmin",
}));

export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  gap: "1vmin",
  padding: "1vmin",
});

export const StyledCircle = styled(Box)({
  width: "9vmin",
  height: "9vmin",
  borderRadius: "100%",
  boxShadow: "0px 0px 12px -5px rgba(66, 68, 90, 1)",
});

export const StyledStatus = styled(Box)(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "3vmin",
  padding: "0 5px",
  borderRadius: "1.5vmin",
  border: `1px solid ${color}`,
}));
