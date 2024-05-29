import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "1vmin",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
});

export const StyledList = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[theme.palette.mode],
  boxShadow: `inset 0 0 0 1000px #00000033`,
  display: "flex",
  flexDirection: "column",
  gap: "1vmin",
  borderRadius: "1vmin",
  height: "75vmin",
  width: "50vmin",
}));
