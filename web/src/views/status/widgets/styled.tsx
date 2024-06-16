import { Box, Card, Switch, styled } from "@mui/material";
import { convertSvg } from "../../../utils";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const StyledStatusContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  minHeight: "5vmin",
  borderRadius: "3vmin",
  width: "50%",
  padding: "1vmin",
  backgroundColor: theme.palette.shadow[theme.palette.mode],
  alignContent: "center",
}));

export const StyledStatusPreview = styled(Card)(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  height: "3vmin",
  padding: "0 5px",
  borderRadius: "1.5vmin",
  border: `1px solid ${color}`,
}));

export const StyledToRight = styled(Box)({
  display: "flex",
  marginLeft: "auto",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: "8vmin",
  height: "4vmin",
  padding: 7,
  "& .MuiSwitch-switchBase": {
    transform: "translateX(0.5vmin)",
    padding: 0,
    "&.Mui-checked": {
      transform: "translateX(3.5vmin)",

      color: "#fff",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: convertSvg(<FaEye color="white" />),
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.info[theme.palette.mode],
        boxShadow: "inset 0px 0px 5px 1px rgba(66, 68, 90, 1)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: "4vmin",
    height: "4vmin",
    backgroundColor: theme.palette.secondary[theme.palette.mode],

    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: convertSvg(<FaEyeSlash color="white" />),
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
