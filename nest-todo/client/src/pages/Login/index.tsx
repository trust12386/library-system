import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import styles from './styles.module.scss'

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [authForm, setAuthForm] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const login = async () => {
    const isLogin = await auth.login({ ...authForm });
    if (isLogin) {
      setMsg("登录成功");
      navigate("/");
    } else {
      setMsg("登录失败");
    }
  };  

  return (
    <div className={styles.wrap}>
      <div className={styles.login}>
        <h1>登录页</h1>

        {msg && <p style={{ color: "red" }}>{msg}</p>}

        <div>
          <label htmlFor="username">
            用户名
            <input
              type="text"
              value={authForm.username}
              onChange={(e) =>
                setAuthForm({ ...authForm, username: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            密码
            <input
              type="text"
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />
          </label>
        </div>
        <button onClick={login}>登录</button>
      </div>
    </div>
  );
};

export default Login;
