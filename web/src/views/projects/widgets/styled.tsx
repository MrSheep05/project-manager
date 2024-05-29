import { Box, Typography, styled } from "@mui/material";

export const StyledProjectContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderColor: theme.palette.secondary[theme.palette.mode],
  borderRadius: "2vmin",
  width: "45vmin",
  height: "22vmin",
  border: "2px solid",
  padding: "1vmin",
}));

export const StyledRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "1vmin",
});
export const StyledTitle = styled(Typography)({
  fontSize: "2vmin",
  fontWeight: "bold",
});
export const StyledCategory = styled(Box)(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "3vmin",
  padding: "0 5px",
  borderRadius: "1.5vmin",
  border: `1px solid ${color}`,
}));
