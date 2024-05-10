import { Avatar, Box, styled } from "@mui/material";

export const StyledRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: theme.palette.primary[theme.palette.mode],
  gap: "1vmin",
}));

export const StyledSidebar = styled(Box)(({ theme }) => ({
  margin: "2vmin",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  borderRadius: "3vmin",
  height: "98%",
  boxShadow: `inset 0 0 0 1000px #00000033`,
  backgroundColor: theme.palette.primary[theme.palette.mode],
}));

export const StyledContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 6,
  backgroundColor: theme.palette.primary[theme.palette.mode],
}));

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  right: 0,
  margin: "3vmin",
  height: "10vmin",
  borderRadius: "2vmin",
  width: "28vmin",
  boxShadow: `inset 0 0 0 1000px #00000033`,
  backgroundColor: theme.palette.primary[theme.palette.mode],
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "7vmin",
  height: "7vmin",
  boxShadow: "0px 0px 3px 1px #00000066",
  backgroundColor: theme.palette.secondary[theme.palette.mode],
}));
