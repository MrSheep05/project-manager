import { Blocks } from "react-loader-spinner";
import { StyledContainer, StyledText } from "./styled";
const Loading = (props: { message: String }) => {
  return (
    <StyledContainer>
      <StyledText>{props.message}</StyledText>
      <Blocks></Blocks>
    </StyledContainer>
  );
};

export default Loading;
