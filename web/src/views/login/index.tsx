import { useContext, useEffect, useState } from "react";
import { AppState } from "../../hooks/app-state";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import { StyledContainer } from "./styled";
import { post } from "../../utils/server-requests";
import { Tokens } from "../../utils/types";
import { AppAction } from "../../hooks/app-state/types";
import { AppRoutes } from "../../routes/types";

const Login = () => {
  const [loadingText, setLoadingText] = useState("Loading...");
  const { dispatch } = useContext(AppState);
  const navigate = useNavigate();

  //TODO move out logic from UI
  //TODO? create separate custom hook for login page
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get("code");

    const getTokens = async (code: String) => {
      try {
        const { accessToken, refreshToken } = await post<Tokens>({
          body: { code },
          path: "/auth/tokens",
        });
        if (accessToken && refreshToken) {
          console.log("ACCESS", accessToken, "REFRESH", refreshToken);
          setLoadingText("Redirecting to homepage...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          dispatch({
            type: AppAction.SaveTokens,
            payload: { accessToken, refreshToken },
          });
          console.log("GO HOME", Date.now());

          navigate(AppRoutes.Project);
          return;
        }
      } catch (err) {
        console.log(err);
      }
      setLoadingText("Error occurred");
    };

    if (code === null) {
      setLoadingText("Redirecting to google...");
      setTimeout(
        () => (window.location.href = "http://localhost:8080/auth/google"),
        500
      );
    } else {
      getTokens(code);
    }
  }, []);

  return (
    <StyledContainer>
      <Loading message={loadingText}></Loading>
    </StyledContainer>
  );
};

export default Login;
