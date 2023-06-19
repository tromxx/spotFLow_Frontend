import React from "react";
import styled from 'styled-components'
import Logo from "../images/logo.png"
import GoogleLogo from "../images/GoogleLogin.png"
import KakaoLogo from "../images/KakaoLogin.png"

const LogInDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 15vh;
`;

const LogInContainer = styled.ul`
    width: 629px;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 70px;
    justify-content: baseline;
    align-items: center;
    border: 2px solid var(--grey);
    border-radius: 20px;
    padding: 100px;
    list-style: none;
    font-family: var(--kfont);
    input {
        width: 500px;
        height: 70px;
        font-size: 15px;
        border: 0;
        border-radius: 20px;
        outline: none;
        padding-left: 10px;
        background-color: rgb(233, 233, 233);
        font-family: var(--efont);
        font-size: 20px;
    }
    li:nth-last-child(-n+2) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 70px;
        font-size: 20px;
        border: 0;
        border-radius: 20px;
        outline: none;
        padding-left: 10px;
        text-align: center;
        background-color: white;
        border: 2px solid var(--grey);
        cursor: pointer;
    }
    li:nth-last-child(1) {
        background-color: yellow;
    }
`;

const Login = () => {
    return(
        <LogInDiv>
            <LogInContainer>
                <li><img src={Logo} alt="" /></li>
                <li><input type="text" placeholder="email@gmail.com"/></li>
                <li><input type="text" placeholder="password"/></li>
                <li><p>회원가입 아이디/비밀번호 찾기</p></li>
                <li><img src={GoogleLogo} alt="" /></li>
                <li><img src={KakaoLogo} alt="" /></li>
            </LogInContainer>
        </LogInDiv>
    );

};

export default Login;