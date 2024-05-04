import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppState } from "../../hooks/app-state";
import { AppRoutes } from "../../routes/types";
import { WebsocketStateComponent } from "../../hooks/websocket";

const Home = () => {
  const {
    state: { tokens },
  } = useContext(AppState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokens) {
      console.log("GO LOGIN", Date.now());

      navigate(AppRoutes.Login);
    }
  }, [tokens]);
  return (
    <WebsocketStateComponent>
      <div>
        Home
        <Outlet />
      </div>
    </WebsocketStateComponent>
  );
};

export default Home;
