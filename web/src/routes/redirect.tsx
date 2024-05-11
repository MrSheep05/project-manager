import { useNavigate } from "react-router-dom";
import { AppRoutes } from "./types";
import { useEffect } from "react";

const Redirect = (props: { path: AppRoutes }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("GO HOME", Date.now());
    navigate(props.path);
  }, []);
  return <div></div>;
};

export default Redirect;
