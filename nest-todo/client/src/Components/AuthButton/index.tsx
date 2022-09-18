import React from "react";
import { useContext } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

interface Props {}

const AuthButton: FC<Props> = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  if (!token) {
    return <p style={{ color: "red" }}>你还没有登录</p>;
  }

  return (
    <p>
      Welcome!{" "}
      <button
        onClick={async () => {
          await logout();
          navigate('/')
        }}
      >登出</button>
    </p>
  );
};

export default AuthButton;
