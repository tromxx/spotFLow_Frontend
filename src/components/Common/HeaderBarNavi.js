import { styled } from 'styled-components';
import Logo from '../../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../../images/DarkLogo.png"
import { useTheme } from "../../context/themeProvider";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";
import { BiExit } from 'react-icons/bi'
import { useState } from 'react';
import { VscBellDot, VscBell } from 'react-icons/vsc'
import { useEffect } from 'react';
import CustomerApi from '../../api/CustomerApi';
import NotificationSocket from '../../pages/noti';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import WebSocketProvider from '../../context/WebSockeProvider';
import { WebSocket } from '../../App';


const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
  position: fixed;
  z-index: 5;
`;

const LoggedOutDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 3vw;
  gap: 15px;
  cursor: pointer;
  p:nth-child(odd):hover{
    color: var(--lightblue);
  }
`

const LogoImg = styled.img`
  width: 20vh;
  min-width: 150px;
  cursor: pointer;
  padding-left: 35px;
`;

const LoggedInDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 65px;
  gap: 15px;

  .noti {
    border: none;
    background-color: transparent;
  }

`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 30px;
  &:hover{
    color: var(--lightblue);
  }
`;

const NofiOn = styled(VscBellDot)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  &:hover{
    color: var(--lightblue);
  }
`;

const NofiNone = styled(VscBell)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  &:hover{
    color: var(--lightblue);
  }
`;


const HeaderBar = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  const{ email, setEmail, nickname, setNickname,setProfilePic,setStatMsg,setFollower, setFollowing ,isLoggedIn, setIsLoggedIn, received, setReceived } = useContext(UserContext);

  const webSocketService = useContext(WebSocket);
  const [text, setText] = useState("");

  const endPoint = "http://localhost:8111/ws";
  const stompClient = Stomp.over(new SockJS(endPoint));
  localStorage.setItem("client", stompClient);
  const token = localStorage.getItem("authToken");
  const header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  };
  useEffect(() => {
    
    webSocketService.subscribe(`/${email}`, function (response) {
      const data = JSON.parse(response.body);
      console.log(data);
      setText(data.message);
    
      
    }, []);
    return () => {
      stompClient.disconnect();
    };
  });

  
  
    useEffect(() => {
    const token = localStorage.getItem('authToken');
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.customer.email);
          setNickname(response.data.customer.nickName);
          setProfilePic(response.data.customer.profilePic);
          setStatMsg(response.data.customer.statMsg);
          setFollower(response.data.follower.follower);
          setFollowing(response.data.follower.following);
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      }else{
        return null;
      }
    };
    getCustomerInfo();
  }, [isLoggedIn,setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn,setFollower, setFollowing]);

  const logOut = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const handleNoti = () => {
    navigate("notification");
    setReceived("");
  }

  return (
    <HeaderBarDiv>
      <LogoImg
        src={ThemeMode === 'dark' ? DarkLogo : Logo}
        onClick={()=>navigate("/")}
      />
      {isLoggedIn ? 
        <LoggedInDiv>
          <button className="noti" onClick={()=>{handleNoti()}}>
              {received !== "" ? <NofiOn /> : <NofiNone />}
          </button>
          <p>{nickname}</p>
          <Exit onClick={logOut}/>
        </LoggedInDiv>
        :
        <LoggedOutDiv>
          <p onClick={()=>navigate("/login")}>Login</p>
          <p>|</p>
          <p onClick={()=>navigate("/signup")}>Sign up</p>
        </LoggedOutDiv>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;
