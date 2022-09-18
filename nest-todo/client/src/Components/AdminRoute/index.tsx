import { FC, useContext } from "react";
import { RouteProps, Navigate, Route } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import React from "react";

interface Props extends RouteProps {}

const AdminRoute: FC<Props> = (props) => {
  const { children, ...rest } = props;

  const { isAdmin } = useContext(AuthContext);
  // const isAdmin = true;

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <PrivateRoute {...rest}>{children}</PrivateRoute>;
};

export default AdminRoute;
