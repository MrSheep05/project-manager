import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/types";
import { StyledButton } from "../styled";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

type RouteButtonProps = {
  route?: AppRoutes;
  name: string;
  children: JSX.Element;
  onClick?: () => void;
};
const RouteButton = ({ route, name, children, onClick }: RouteButtonProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const condition = location.pathname === route;
  return (
    <StyledButton
      onClick={onClick ?? (() => navigate(route ?? AppRoutes.Home))}
      style={{
        boxShadow: condition ? `inset 0 0 0 1000px #EBF4FEFF` : undefined,
      }}
    >
      {children}
      <Typography
        width={"100%"}
        style={{ textShadow: condition ? "1px 1px" : undefined }}
      >
        {name}
      </Typography>
    </StyledButton>
  );
};

export default RouteButton;
