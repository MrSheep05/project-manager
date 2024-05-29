import { Box, Button, styled } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  color: "white",
  width: "80%",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.secondary[theme.palette.mode],
  "&:hover": {
    backgroundColor: theme.palette.info[theme.palette.mode],
  },
  width: "20vmin",
  height: "4vmin",
}));
