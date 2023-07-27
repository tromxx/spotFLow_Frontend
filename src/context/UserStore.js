import { createContext, useState }  from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [statMsg , setStatMsg] = useState("");
  const [follower, setFollower] = useState();
  const [following, setFollowing] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewNofi, setIsNewNofi] = useState(false);


  return (
    <UserContext.Provider value={{ email, setEmail, nickname, setNickname, profilePic,setProfilePic, statMsg, setStatMsg, isLoggedIn,follower, setFollower, following, setFollowing, setIsLoggedIn, isNewNofi, setIsNewNofi}}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
