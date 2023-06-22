import React from "react";
import styled from 'styled-components'
import Logo from "../images/logo.png"
import GoogleLogo from "../images/GoogleLogin.png"
import KakaoLogo from "../images/KakaoLogin.png"
import { useNavigate } from "react-router";

const LogInDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  top: 100px;
  ul{
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: baseline;
    align-items: center;
    border: 2px solid var(--grey);
    border-radius: 20px;
    padding: 100px;
    list-style: none;
    font-family: var(--kfont);
  }
  input {
        width: 400px;
        height: 50px;
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
        width: 400px;
        height: 50px;
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
    .container{
        display: flex;
        gap: 30px;
        font-family: var(--kfont);
        cursor: pointer;
        p:hover{
            color: var(--blue);
        }
    }
`;


const Login = () => {
    const navigate = useNavigate();

    const goToSingup = () =>{
        navigate("/signup");
    }
    return(
        <LogInDiv>
            <ul>
                <li><img src={Logo} alt="" /></li>
                <li><input type="text" placeholder="email@gmail.com"/></li>
                <li><input type="password" placeholder="password"/></li>
                <div className="container">
                    <p onClick={goToSingup}>회원가입</p>
                    <p>아이디/비번찾기</p>
                </div>
                <li><img src={GoogleLogo} alt="" /></li>
                <li><img src={KakaoLogo} alt="" /></li>
            </ul>
        </LogInDiv>
    );

};

export default Login;