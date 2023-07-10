import React from "react";
import { styled } from 'styled-components';
import Logo from '../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../images/DarkLogo.png"
import { useTheme } from "../context/themeProvider";
import { useState } from "react";
import { useEffect } from "react";

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
  img {
    padding-left: 3%;
    width:20vh;
    height: 100%;
    cursor: pointer;
  }
`;

const LogoImg = styled.img`
  width: 20vh;
  min-width: 150px;
  height: 100%;
  cursor: pointer;
`;


const HeaderBar = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  
  return (
    <HeaderBarDiv>
      <LogoImg
        src={ThemeMode === 'dark' ? DarkLogo : Logo}
        onClick={()=>navigate("/")}
      />
      <ul>
        <li onClick={()=>navigate("/login")}>Login</li>
        <li>/</li>
        <li onClick={()=>navigate("/signup")}>Sign up</li>
      </ul>
    </HeaderBarDiv>
  );
};

export default HeaderBar;
