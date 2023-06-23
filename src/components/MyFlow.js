import React from "react";
import { styled } from 'styled-components';


const MyFlowDiv = styled.div`
  	display: flex;
  	justify-content: center;
  	align-items: center;
	text-align: center;
	top: 7vh;   
	width: 80%;
	height: 100%;
`;

const MyFlow = () =>{
    return(
			<MyFlowDiv>
				<p>마이플로우</p>
			</MyFlowDiv>
    );
};

export default MyFlow;