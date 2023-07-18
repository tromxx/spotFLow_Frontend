import React from "react";
import Logo from "../images/logo.png"
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FindPwEmailDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    text-align: center;
    ul{
		width: 400px;
		display: flex;
		flex-direction: column;
		gap: 25px;
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
	li:nth-last-child(2) {
		color: grey;
	}
   li:nth-last-child(1) {
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
      background-color: ${props => (props.condition? 'blue' : 'grey')};
      border: 2px solid var(--grey);
      cursor: pointer;
	}
`;

const FindPwEmail = () =>{
   const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [message, setMessage] = useState();
	const [condition, setCondition] = useState(false); 

	const checkRegXEmail = (e) => {
		const validateEmail = (email) => {
		  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		  return regex.test(email);
		}
		setEmail(e.target.value);
		if (!validateEmail(e.target.value)) {
			setMessage("이메일 형식으로 입력해주세요");
		} else {
			setMessage("올바른 형식입니다.");
			setCondition(true);
		}
	 };
   return(
        <FindPwEmailDiv>
            <ul>
                <li><img src={Logo} alt="" onClick={()=>navigate("/")}/></li>
                <li><h3>로그인에 문제가 있나요?</h3></li>
                <li>이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 임시 비밀번호를 보내드립니다.</li>
                <li><input placeholder="email@gmail.com" onChange={checkRegXEmail}/></li>
					 <li>{message}</li>
					 <li condition={condition}>로그인 링크 보내기</li>

            </ul>
        </FindPwEmailDiv>
    );
};

export default FindPwEmail;