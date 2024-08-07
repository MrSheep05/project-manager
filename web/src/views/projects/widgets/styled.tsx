import {
  Box,
  ButtonBase,
  Card,
  Select,
  Typography,
  keyframes,
  styled,
} from "@mui/material";

const shine = keyframes`
  from {
    background-position: -150vw 2em;
  }
  
  to {
    background-position: -50vw 2em;
  }
`;

export const StyledProjectContainer = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "45vmin",
  flex: 1,
  maxHeight: "45%",
  padding: "1vmin",
}));

export const StyledRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "1vmin",
});
export const StyledTitle = styled(Typography)({
  fontSize: "2vmin",
  fontWeight: "bold",
});
export const StyledStatus = styled(Select)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "3vmin",
  padding: "0 5px",
  borderRadius: "1.5vmin",
  "& .MuiSelect-select": {
    paddingRight: "0 !important",
    padding: "0 !important",
  },
});

export const StyledCategory = styled(Box)(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "3vmin",
  padding: "0 5px",
  borderRadius: "1.5vmin",
  backgroundColor: `${color}`,
  border: `1px solid ${color}`,
}));

export const StyledLoadingProject = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "2vmin",
  width: "45vmin",
  flex: 1,
  backgroundColor: theme.palette.shadow[theme.palette.mode],
  color: "black",
  padding: "1vmin",
  height: "100%",
  background: `linear-gradient(90deg, ${
    theme.palette.shadow[theme.palette.mode]
  } 0%,  ${theme.palette.info[theme.palette.mode]} 17%,  ${
    theme.palette.info[theme.palette.mode]
  } 20%, ${theme.palette.shadow[theme.palette.mode]} 27%)`,
  backgroundSize: `100vw 2em`,
  backgroundPosition: `-150vw 0px`,
  transition: "all linear .6s",
  animation: `${shine} 2s infinite ease`,
}));

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
  padding: "1vmin",
}));
