import React from "react";
import { styled } from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlinePlus ,AiOutlineEdit , AiFillDelete} from "react-icons/ai";
import MyFlowContainer from "./MyFlowContainer"
import FlowData from "../dataSet/FlowData";
import { useState } from "react";
import { CgSortAz, CgSortZa } from "react-icons/cg";

const MyFlowDiv = styled.div`
  	display: flex;
  	justify-content: center;
  	align-items: center;
		text-align: center;
		flex-direction: column;
		position: relative;
`;

const BiArrowBacks = styled(BiArrowBack)`
 	margin-left: 30px;
	color: var(--grey);
	cursor: pointer;
	&:hover{
		color: var(--blue);
	}
`;

const MyFlowMenuName = styled.p`
	display: flex;
	justify-content: space-between;
	font-family: var(--efont);
	width: 80%;
	font-size: 30px;
	font-weight: bolder;
	margin-top: -10%;
	align-self: flex-start; // 왼쪽 정렬을 위해 align-self 속성을 추가합니다.
  margin-left: 10%; // 원하는 왼쪽 여백을 설정합니다.
`;

const MenuBar = styled.div`
	width: 80%;
	height: 30px;
	border-radius: 8px;
	background-color: #d9d9d9;
`;

const CreateBtn = styled.div`
    
    border-radius: 8px;
		border: 1px solid #d9d9d9;
    width: 35px;
    height: 35px;
    color: white;
    margin : 5px;
		align-self: flex-end;
    &:hover{
        background-color: white;
        border: 1px solid silver;
    }
    ${(props) => props.isClicked && 
        `background-color: black; `
    }
`

const FlowDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start; 
	align-items: center;
	margin-top: 30px;
	width: 100%;
	height: 60vh;
	gap: 10px; 
	overflow-y: scroll; 
	padding-right: 5px;
	
`;

const ScrollBar = styled.div`
	width: 80%;
	height: 60vh;
	
	::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
		
	}

	::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #d9d9d9; /* 스크롤바의 색상 */
    border-radius: 10px;
		transition: 0.2s ease;
	}

	::-webkit-scrollbar-thumb:hover {
		
    background-color: grey;
  }
	padding-right: 5px;
`;

const MyFlow = ({ handleMain }) =>{

	const [flow, setFlow] = useState(FlowData);

    return(
		<>
			<h1 onClick={handleMain}><BiArrowBacks/></h1>
			<MyFlowDiv>
				<MyFlowMenuName>
					<p>myFlow</p>
					<CreateBtn>
					<AiOutlinePlus style={{ color: 'grey' }}></AiOutlinePlus>
				</CreateBtn>
				</MyFlowMenuName>
				
				<MenuBar>

				</MenuBar>
				<ScrollBar>
				<FlowDiv>
					{flow.map((item) => (
						<MyFlowContainer img={item.src} id={item.id} time={item.time} content={item.content} location={item.location}/>
					))}
				</FlowDiv>
				</ScrollBar>
			</MyFlowDiv>
		</>
    );
};

export default MyFlow;