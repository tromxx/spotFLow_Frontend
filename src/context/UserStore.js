import { useEffect } from "react";
import { createContext, useState }  from "react";
import CustomerApi from "../api/CustomerApi";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [statMsg , setStatMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getCustomerInfo = async () => {
      const token = localStorage.getItem('authToken');
      if (token != null && isLoggedIn) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.email);
          setNickname(response.data.nickName);
          setProfilePic(response.data.profilePic);
          setStatMsg(response.data.statMsg);
          setIsLoggedIn(true);
        } catch (error) {
          throw error;
        }
      }
    };
    getCustomerInfo();
  }, []);

  return (
    <UserContext.Provider value={{ email,setEmail, nickname, setNickname, profilePic,setProfilePic, statMsg, setStatMsg, isLoggedIn, setIsLoggedIn}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
