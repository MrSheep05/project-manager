import { Box, Typography, keyframes, styled } from "@mui/material";

const shine = keyframes`
  from {
    background-position: -150vw 2em;
  }
  
  to {
    background-position: -50vw 2em;
  }
`;

export const StyledProjectContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "2vmin",
  width: "45vmin",
  flex: 1,
  backgroundColor: theme.palette.shadow[theme.palette.mode],
  color: "black",
  padding: "1vmin",
  boxShadow: "inset 0px 0px 10px 2px rgba(66, 68, 90, 1)",
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
export const StyledCategory = styled(Box)(({ color }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "3vmin",
  padding: "0 5px",
  borderRadius: "1.5vmin",
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
