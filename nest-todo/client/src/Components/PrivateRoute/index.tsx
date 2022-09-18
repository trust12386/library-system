import { FC, useContext } from "react";
import { Route, RouteProps, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import React from "react";
interface Props extends RouteProps {}

const PrivateRoute: FC<Props> = (props) => {
  const { children, ...rest } = props;
  // const location = useLocation();

  // console.log(children);
  // const { token } = useContext(AuthContext);
  // const { token } = useContext(AuthContext);
  // if (!token) {
  //   return <Navigate to={{ pathname: "/login" }} state={{ from: location }} />;
  // }
  return <React.Fragment {...rest}>{children}</React.Fragment>;
};

export default PrivateRoute;
