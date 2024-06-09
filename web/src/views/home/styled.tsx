import { Avatar, Box, Typography, styled } from "@mui/material";

export const StyledAddProject = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1vmin",
  alignItems: "stretch",
  marginBottom: "1vmin",
  width: "100%",
}));

export const StyledAddProjectColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1vmin",
  alignItems: "stretch",
  justifyContent: "center",
  width: "100%",
  flexGrow: 1,
  padding: "1vmin"
}));

export const StyledSidebar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100%",
  alignItems: "start",
  justifyContent: "center",
  backgroundColor: theme.palette.shadow[theme.palette.mode],
  gap: "1vmin",
  maxWidth: "20vw",
}));

export const StyledContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 4,
  height: "100%",
  width: "100%",
  maxWidth: "80vw",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary[theme.palette.mode],
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginRight: "1vmin",
  minWidth: "55px",
  minHeight: "55px",
  maxWidth: "75px",
  maxHeight: "75px",
  display: "flex",
  backgroundColor: theme.palette.shadow[theme.palette.mode],
}));

export const StyledRow = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export const StyledTypography = styled(Typography)({});
