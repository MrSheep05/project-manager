import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import "./login-page.css";

const Login = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");
  const [loadingText, setLoadingText] = useState("Loading...");

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    setLoadingText("Checking code...");
    if (code === null) {
      setLoadingText("Redirecting to google...");
      window.location.href = "http://localhost:8080/auth/google";
    } else {
      fetch("http://localhost:8080/auth/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoadingText("Redirecting to homepage...");
          console.log("Success:", data);
        })
        .catch((error) => {
          setLoadingText("Error occurred");
          console.error("Error", error);
        });
    }
  }, [code]);

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
