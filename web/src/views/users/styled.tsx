import { Box, Switch, alpha, styled } from "@mui/material";
import { green, red } from "@mui/material/colors";

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignItems: "left",
  width: "100%",
}));

export const EnabledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
  "& .MuiSwitch-switchBase": {
    color: red[600],
    "&:hover": {
      backgroundColor: alpha(red[600], theme.palette.action.activatedOpacity),
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: red[600],
  },
}));
