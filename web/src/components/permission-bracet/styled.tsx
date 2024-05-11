import { Box, styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "1vmin",
});

export const StyledUserIcon = styled(PersonIcon)(({ theme }) => ({
  color: theme.palette.info[theme.palette.mode],
  fontSize: "3vmin",
}));

export const StyledAdminIcon = styled(AdminPanelSettingsIcon)(({ theme }) => ({
  color: theme.palette.info[theme.palette.mode],
  fontSize: "3vmin",
}));
