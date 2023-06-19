import React from "react";
import { styled } from 'styled-components';
import Logo from '../images/logo.png';
import { useNavigate } from "react-router";

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--grey);
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

const HeaderBar = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToSignUp = () => {
    navigate("/Singup");
  };

  return (
    <HeaderBarDiv>
      <img src={Logo} alt="not working" onClick={goToHome}/>
      <ul>
        <li onClick={goToLogin}>Login</li>
        <li>/</li>
        <li onClick={goToSignUp}>Sign up</li>
      </ul>
    </HeaderBarDiv>
  );
};

export default HeaderBar;
