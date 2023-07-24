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
import axios from 'axios';
import CustomerApi from '../../api/CustomerApi';


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
  position: absolute;
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

  .nofi {
    margin-right: 50px;
    background-color: transparent;
    border: none;
    margin-top: 10px;
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


const HeaderBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  const [isNewNofi, setIsNewNofi] = useState("");
  const [nofiData, setNofiData] = useState("");
  const{ email, nickname,  isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  
  useEffect(() => {
    
    const notification = async (email) => {
      return await CustomerApi.notification(email);
    }

    notification();
  
  }, []);

  const logOut = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
  }

  const notificationFunc = () => {
    navigate("/nofication");
    setIsNewNofi(false);
  }

  return (
    <HeaderBarDiv>
      <LogoImg
        src={ThemeMode === 'dark' ? DarkLogo : Logo}
        onClick={()=>navigate("/")}
      />
      {isLoggedIn ? 
        <LoggedInDiv>
          <button className="nofi" onClick={()=>{}}>
              {isNewNofi ? <NofiOn /> : <NofiNone />}
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
