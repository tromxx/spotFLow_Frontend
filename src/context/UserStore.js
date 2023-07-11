import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthApi from "../api/AuthApi";

export const UserContext = createContext(null);

const UserStore = (props) => {
  const [email, setEmail] = useState("testAccount0");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 중인지

  const restoreSession = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await AuthApi.userInfo(token);
        setEmail(response.data[0].memberNo);
        setNickname(response.data[0].nickname);
        handleLogin(); // restoreSession 처리 완료 후 handleLogin 호출
      } catch (error) {
        console.log("세션 복구 중 오류 발생 : ", error);
        handleLogout();
        Navigate("/");
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const fetchData = async () => {
      await restoreSession(); // restoreSession 비동기로 처리
    };
    fetchData(); // fetchData 함수 호출
  }, []);

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        nickname,
        setNickname,
        isLoggedIn,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
