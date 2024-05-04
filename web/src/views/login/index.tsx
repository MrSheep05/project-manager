import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useContext, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import "./index.css";
import { post } from "../../utils/server-requests";
import { Tokens } from "../../utils/types";
import { AppState } from "../../hooks/app-state";
import { AppAction } from "../../hooks/app-state/types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/types";

const Login = () => {
  const [loadingText, setLoadingText] = useState("Loading...");
  const { dispatch } = useContext(AppState);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container">
        <div className="text">{loadingText}</div>
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    </ThemeProvider>
  );
};

export default Login;
