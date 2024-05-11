import { Typography } from "@mui/material";
import { Role } from "../../utils/types";
import { StyledAdminIcon, StyledContainer, StyledUserIcon } from "./styled";

const PermissionBracet = (props: { role?: Role }) => {
  return (
    <StyledContainer>
      {props.role === Role.Admin ? <StyledAdminIcon /> : <StyledUserIcon />}
      {props.role ? (
        <Typography>{`${props.role[0].toUpperCase()}${props.role.substring(
          1
        )}`}</Typography>
      ) : null}
    </StyledContainer>
  );
};

export default PermissionBracet;
