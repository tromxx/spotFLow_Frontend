import React from "react";
import { styled } from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';

const MyFlowDiv = styled.div`
  	display: flex;
  	justify-content: center;
  	align-items: center;
	text-align: center;
`;

const BiArrowBacks = styled(BiArrowBack)`
	margin-top: 47px;
	margin-left: 5px;
	color: var(--grey);
	cursor: pointer;
	&:hover{
		color: var(--blue);
	}
`;

const MyFlow = ({handleMain}) =>{
    return(
		<>
			<h1 onClick={handleMain}><BiArrowBacks/></h1>
			<MyFlowDiv>
				<p>마이플로우</p>
			</MyFlowDiv>
		</>
    );
};

export default MyFlow;