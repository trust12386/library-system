import { FC, useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import http from "../../http";
import { CountRsp } from "../../types/Common";
import { Quote } from "../../types/Quote";
import { Outlet, Link } from "react-router-dom";
import AuthButton from "../../Components/AuthButton";
import ChatRoom from "../../Components/ChatRoom";
import styles from "./styles.module.scss";
import AuthContext from "../../contexts/AuthContext";

const Home: FC = () => {
  const { isAdmin, token,logout } = useContext(AuthContext)

  const [count, setCount] = useState(0);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [quote, setQuote] = useState<Quote | null>(null);

  const updateAndGetCount = async () => {
    http.post("/count").then();

    const { data } = await http.get<CountRsp>("/count");
    setCount(data.count);
  };

  const fetchQuote = async () => {
    const { data } = await http.get<Quote>("/quote/random");
    setQuote(data);
  };

  useEffect(() => {
    Promise.all([updateAndGetCount(), fetchQuote()]).then();
  }, []);
  return (
    <div>
      <header className={styles.nav}>
        <div className={styles.left}>
          <Link to="/">首页</Link>
        </div>
        <div className={styles.right}>
          {!token ? <Link to="/login">登录</Link> : <p onClick={
            async() => {
              await logout()
              window.location.reload()
            }}>登出</p>}
          <div>访问量：{count}</div>
          {isAdmin && <Link to="/admin" className={styles.admin}>管理员页面</Link>}
        </div>
      </header>
      <div>
        <header>
          {quote && (
            <p>
              今日金句：
              <i>
                {quote.content} -- {quote.author}
              </i>
            </p>
          )}
        </header>

        <AuthButton />

        <Outlet />

        {!chatVisible && token && (
          <button
            className={styles.startChat}
            onClick={() => setChatVisible(true)}
          >
            我要聊天
          </button>
        )}
        {chatVisible && token && (
          <ChatRoom onCancel={() => setChatVisible(false)} />
        )}
      </div>
    </div>
  );
};

export default Home;
