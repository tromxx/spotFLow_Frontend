import React from "react";
import { styled } from 'styled-components';
import Logo from '../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../images/DarkLogo.png"
import { useTheme } from "../context/themeProvider";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import {BiExit} from 'react-icons/bi'

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
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
  img{
    width: 50px;
    min-width: 20px;
    height: 50px;
    min-height: 20px;;
    border-radius: 100px;
  }
`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 30px;
  &:hover{
    color: var(--lightblue);
  }
`;


const HeaderBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  const{isLoggedIn,setIsLoggedIn ,nickname, profilePic} = useContext(UserContext);

  const logOut = () =>{
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  }

  return (
    <HeaderBarDiv>
      <LogoImg
        src={ThemeMode === 'dark' ? DarkLogo : Logo}
        onClick={()=>navigate("/")}
      />
      {isLoggedIn ? 
        <LoggedInDiv>
          <img src={profilePic}/>
          <p>{nickname}</p>
          <Exit onClick={logOut}/>
        </LoggedInDiv>
        :
        <LoggedOutDiv>
          <p onClick={()=>navigate("/login")}>Login</p>
          <p>/</p>
          <p onClick={()=>navigate("/signup")}>Sign up</p>
        </LoggedOutDiv>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;
