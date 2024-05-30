import { Box, styled } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
  height: "85vmin",
  width: "50vmin",
}));

export const StyledRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
  alignItems: "center",
});

export const StyledRightArrow = styled(ChevronRightIcon)(({ theme }) => ({
  color: theme.palette.secondary[theme.palette.mode],
  borderRadius: "100%",
  backgroundColor: theme.palette.primary[theme.palette.mode],
  fontSize: "6vmin",
}));

export const StyledLeftArrow = styled(ChevronLeftIcon)(({ theme }) => ({
  color: theme.palette.secondary[theme.palette.mode],
  borderRadius: "100%",
  backgroundColor: theme.palette.primary[theme.palette.mode],
  fontSize: "6vmin",
}));
