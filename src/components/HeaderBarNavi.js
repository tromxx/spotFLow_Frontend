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
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
  z-index: 5;
  ul{
    display: flex;
    flex-direction: row;
    padding-right: 3vw;
    gap: 15px;
    cursor: pointer;
  }
  li {
    font-family: var(--efont);
    font-size: 2vh;
    list-style: none;
  }
  li:hover {
    transition: 0.25s;
    color: var(--blue);
  }
`;

const LogoImg = styled.img`
  width: 20vh;
  min-width: 150px;
  cursor: pointer;
  padding-left: 25px;
`;

const ProfImg = styled.img`
  width: 49px;
  height: 5vh;
  padding-top: 5px;
`

const LoggedInUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 3vh;
  padding-top: 5px;
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
        <LoggedInUl>
          <li><ProfImg src={profilePic}/></li>
          <li>{nickname}</li>
          <li onClick={logOut}><Exit/></li>
        </LoggedInUl>
        :
        <ul>
          <li onClick={()=>navigate("/login")}>Login</li>
          <li>/</li>
          <li onClick={()=>navigate("/signup")}>Sign up</li>
        </ul>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;
