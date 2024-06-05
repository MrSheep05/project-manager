import { Box, Button, styled } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";

const iconsStyle = {
  fontSize: "4vmin",
  color: "black",
  marginRight: "auto",
};
export const StyledColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1vmin",
  width: "100%",
  flex: 5,
  alignItems: "center",
  justifyContent: "center",
});

export const StyledLogoutIcon = styled(LogoutIcon)(iconsStyle);

export const StyledAccountsIcon = styled(GroupIcon)(iconsStyle);

export const StyledStatusIcon = styled(AdsClickIcon)(iconsStyle);

export const StyledCategoriesIcon = styled(CategoryIcon)(iconsStyle);

export const StyledProjectIcon = styled(ListAltIcon)(iconsStyle);

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
