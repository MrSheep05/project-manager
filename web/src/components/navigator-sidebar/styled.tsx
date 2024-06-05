import { Box, Button, styled } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1vmin",
  width: "100%",
  flex: 5,
  alignItems: "center",
  justifyContent: "center",
});

export const StyledLogoutIcon = styled(LogoutIcon)({
  fontSize: "5vmin",
  color: "black",
  marginRight: "auto",
});

export const StyledButton = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  backgroundColor: "transparent",
  width: "100%",
});

export const StyledEnd = styled(Box)({
  marginTop: "auto",
  paddingBottom: "5vmin",
  width: "100%",
});
