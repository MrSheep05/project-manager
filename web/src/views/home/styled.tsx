import { Avatar, Box, Typography, styled } from "@mui/material";

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

export const StyledAddProject = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1vmin",
  width: "20vw",
  height: "100vh",
  justifyContent: "flex-start",
  alignItems: "stretch"
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
  padding: "1vmin",
  minHeight: "10vmin",
  borderRadius: "2vmin",
  minWidth: "28vmin",
  boxShadow: `inset 0 0 0 1000px #00000033`,
  backgroundColor: theme.palette.primary[theme.palette.mode],
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  minWidth: "7vmin",
  minHeight: "7vmin",
  display: "flex",
  flex: 1,
  boxShadow: "0px 0px 3px 1px #00000066",
  backgroundColor: theme.palette.secondary[theme.palette.mode],
}));

export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 6,
});
export const StyledTypography = styled(Typography)({});
