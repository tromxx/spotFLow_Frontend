import { createContext, useState }  from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [statMsg , setStatMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <UserContext.Provider value={{ email,setEmail, nickname, setNickname, profilePic,setProfilePic, statMsg, setStatMsg, isLoggedIn, setIsLoggedIn}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
