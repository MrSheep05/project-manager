import { Box, Button, styled } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  color: "white",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.secondary[theme.palette.mode],
  "&:hover": {
    backgroundColor: theme.palette.info[theme.palette.mode],
  },
}));
