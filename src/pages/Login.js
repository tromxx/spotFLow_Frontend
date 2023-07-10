import React from "react";
import styled from 'styled-components'
import Logo from "../images/logo.png"
import GoogleLogo from "../images/GoogleLogin.png"
import KakaoLogo from "../images/KakaoLogin.png"
import SpotLogo from "../images/SpotFlowLogin.png"
import { useNavigate } from "react-router";
import { useState } from "react";
import TestingModal from '../utils/TestingModal'
import axios from "axios";

const LogInDiv = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 7vh;
	ul{
		width: 400px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		justify-content: center;
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
   li:nth-last-child(-n+3) {
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
   li:nth-last-child(2) {
      background-color: yellow;
   }
	li:nth-last-child(1){
		background-color: var(--lightblue);
	}
    .container{
      display: flex;
      gap: 30px;
		margin: 30px 0;
      font-family: var(--kfont);
      cursor: pointer;
      p:hover{
         color: var(--blue);
      }
   }
	@media (max-width : 844px) {
		ul{
			padding: 0;
            border: none;
		}
		input{
			width: 260px;
      }
		li:nth-last-child(-n+3) {
         width: 260px;
      }
	}
`;


const Login = () => {
   const navigate = useNavigate();
   const [inputEmail, setInputEmail] = useState();
   const [inputPwd , setInputPwd] = useState();
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const onClickChecking = async() =>{
		const customerData = {
			email : inputEmail,
			passWord : inputPwd
		};
		try{
			const response = await axios.post("/auth/login", customerData);
			const { authToekn} = response.data;
			localStorage.setItem('authToken', authToekn);
		}catch(error){
			setOpen(true);
			setMessage("잘못된 아이디 혹은 비밀번호입니다.");
		}
	};

   return(
      <LogInDiv>
         <ul>
            <li><img src={Logo} alt="" /></li>
            <li><input onChange={(e)=>setInputEmail(e.target.value)} type="text" placeholder="email@gmail.com"/></li>
            <li><input onChange={(e)=>setInputPwd(e.target.value)} type="password" placeholder="password"/></li>
            <div className="container">
               <p onClick={()=>navigate("/signup")}>회원가입</p>
               <p>아이디/비번찾기</p>
            </div>
            <li><img src={GoogleLogo} alt="" /></li>
            <li><img src={KakaoLogo} alt="" /></li>
				<li onClick={onClickChecking}><img src={SpotLogo} alt="" /></li>
         </ul>
			<TestingModal 
				children={message} 
				type={true} 
				confirm={()=>setOpen(false)} 
				open={open}
				close={()=>setOpen(false)}/>
      </LogInDiv>
   );
};

export default Login;