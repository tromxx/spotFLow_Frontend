import React from "react";
import Logo from '../../images/logo.png'
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const ErrorDiv = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
	flex-direction: column;
	gap: 15px;
   margin-top: 5%;
	font-family: var(--efont);
	.controlNaviDiv{
		display: flex;
		gap: 30px;
		p:nth-child(1), p:nth-child(3){
			cursor: pointer;
			&:hover{
				color: var(--lightblue);
			}
		}
	}
`;

const Error = () =>{
	const navigate = useNavigate();

    return(
        <ErrorDiv>
            <img src={Logo} alt="" />
				<p>로그인이 필요한 서비스 입니다.</p>
				<div className="controlNaviDiv">
					<p onClick={()=>navigate("/login")}>Login</p>
					<p>|</p>
					<p onClick={()=>navigate("/signUp")}>Sign Up</p>
				</div>
        </ErrorDiv>
    );
};

export default Error;