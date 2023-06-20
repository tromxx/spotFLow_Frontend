import React from "react";
import { styled } from 'styled-components';
import Logo from '../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../images/DarkLogo.png"
import { useTheme } from "../context/themeProvider";


const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
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
    color: var(--blue);
  }
  img {
    padding-left: 3%;
    width:20vh;
    height: 100%;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  width: 20vh;
  height: 100%;
  cursor: pointer;
`;


const HeaderBar = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(theme.bgColor);
  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToSignUp = () => {
    navigate("/Signup");
  };

  const [ThemeMode, setTheme] = useTheme();
  
  console.log(ThemeMode)
  return (
      <HeaderBarDiv>
        <LogoImg
          src={ThemeMode === 'dark' ? DarkLogo : Logo}
          onClick={goToHome}
        />
        <ul>
          <li onClick={goToLogin}>Login</li>
          <li>/</li>
          <li onClick={goToSignUp}>Sign up</li>
        </ul>
      </HeaderBarDiv>
  );
};

export default HeaderBar;
