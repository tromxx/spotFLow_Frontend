import React from "react";
import { styled } from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlinePlus ,AiOutlineEdit , AiFillDelete} from "react-icons/ai";
import MyFlowContainer from "./MyFlowContainer"
import FlowData from "../dataSet/FlowData";
import { useState, useEffect, useRef } from "react";
import { CgSortAz, CgSortZa, CgCheckO, CgRadioCheck } from "react-icons/cg";
import { SlPicture } from "react-icons/sl"
import { AiOutlineClose } from 'react-icons/ai';
import FlowModal from "../utils/FlowModal";
import Modal from '../utils/Modal';

const MyFlowDiv = styled.div`
	background-color: white;
	width: 390px;
  	height: 93vh;
	margin-top: 7vh;
  	display: flex;
  	justify-content: center;
  	align-items: center;
	text-align: center;
	flex-direction: column;
	position: relative;
	.controlDiv{
		position: absolute;
		top : 2px
	}
		.flowArea {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 10px;
			outline: none;
			width: 100%;
			height: 100%;
			resize: none;
			border: none;
			border-radius: 5px;
			font-family: var(--kfont);
		}

	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		height: 10%;
		border-radius: 8px;
		background-color: ${props=>props.theme.bgColor};
		outline: none;
		border: none;
		margin-bottom: 10px;
	}

	
	


`;


const FileBox = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-direction: row;

	.fileSelect {
		width: auto;
		height: 50px;
		border: 1px solid black;
	}

	.thumbnail {
        width: 50px;
        height: 50px;
        object-fit: cover;
	}

	.filebox {
		
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		
	}
	.filebox .upload-name {
    display: inline-block;
    height: 40px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 78%;
    color: #999999;
	}
	.filebox label {
    display: inline-block;
    color: #fff;
    cursor: pointer;
    height: 30px;
		width: 30px;
    margin-left: 10px;
		font-family: var(--kfont);
		font-size: 12px;
	}

	.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
	}
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
	margin-top: -15%;
	align-self: flex-start; // 왼쪽 정렬을 위해 align-self 속성을 추가합니다.
	margin-right: 10%;
  margin-left: 5%; // 원하는 왼쪽 여백을 설정합니다.

	.title {
		font-size: 35px;
	}
`;



const CreateBtn = styled.div`
    
    border-radius: 8px;
		border: 1px solid #d9d9d9;
    width: 35px;
    height: 35px;
    color: white;
    margin : 5px;
		margin-left: 40px;
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
	width: 100%;
	height: 60vh;
	margin-top: -20px;
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

const MenuBar = styled.div`
	display: flex;
	width: 75%;
	height: 30px;
	border-radius: 8px;
	background-color: ${props => props.theme.textColor === 'black' ? '#d6d6d6' : '#423F3E'};
	position: relative;
`;

const SortButton = styled.button`
	position: relative;
	width: 30px;
	left: 245px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	

	&:hover {
		cursor: pointer;
	}
`;

const SearchButton = styled.button`
	position: relative;
	width: 30px;
	height: 30px;
	left: 180px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
`;

const SearchImg = styled(AiOutlineSearch)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: 0px;
	top: 0px;
`;

const SortAz = styled(CgSortAz)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: 0px;
	top: 0px;
`;

const SortZa = styled(CgSortZa)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 30px;
	height: 30px;
	left: 0px;
	top: 0px;
`;

const CheckButton = styled.button`
	color: ${props => props.theme.textColor};	
	position: relative;
	width: 30px;
	left: 280px;
	height: 30px;
	border: none;
	background-color: transparent;
	align-self: flex-end;
	&:hover {
		cursor: pointer;
	}
`;

const CheckImg = styled(CgCheckO)`
	color: ${props => props.theme.textColor};
	position: absolute;
	width: 25px;
	height: 25px;
	left: 0px;
	top: 2px;	
`;

const SearchBarInput = styled.input`
	position: absolute;
	top: 4px;
	left: 5px;
	width: 200px;
	height: 75%;
	border: 1px solid #d9d9d9;
	border-radius: 8px;
	background-color: ${props => props.theme.borderColor === '1px solid #424242' ? '#d9d9d9' : 'white'};
	outline: none;
	
`;

const PictureImg = styled(SlPicture)`
	width: 30px;
	height: 30px;
	color: ${props=>props.theme.textColor};
`;

const CloseButton = styled(AiOutlineClose)`
  width: 35px;
  height: 35px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;



const MenuButtonWrapper = styled.div`
	align-self: flex-end;
`;
const MyFlow = ({ onClose, goToMyPage }) =>{

	const [flow, setFlow] = useState(FlowData); // 플로우 더미데이터
	const [sort, setSort] = useState("az"); // 정렬 아이콘 상태 
	const [searchValue, setSearchValue] = useState(""); // 검색창 인풋창 밸류
	const [sortedFlow, setSortedFlow] = useState(FlowData); // 플로우 데이터 정렬

	// 글쓰기 모달 & 알림 모달
	const [flowModalOpen, setFlowModalOpen] = useState(false);
	const [flowModalText, setFlowModalText] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [modalText, setModalText] = useState(
		<>
			작성된 내용은 저장되지 않습니다. <br />
			정말 닫으시겠습니까?
		</>
	);

	const openFlowModal = () => {
		setFlowModalOpen(true);
	}

	const closeFlowModal = () => {
		setModalOpen(true);
	}

	const closeModal = () => {
		setModalOpen(false);
	}

	const closeBoth = () => {
		setModalOpen(false);
		setFlowModalOpen(false);
		setThumbnailSrc("");
	}

	  // 플로우 작성시 이미지 파일 선택하는 핸들링
		const fileInput = useRef();
		const handleOpenImageRef = () => {
			fileInput.current.click();
		}
	
		const [selectedImage, setSelectedImage] = useState("");
	
		const handleUploadImage = (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();
	
			reader.onloadend = () => {
				setSelectedImage(reader.result);
			};
	
			if (file) {
				reader.readAsDataURL(file); // 파일 내용을 읽어옵니다.
			} else {
				setSelectedImage(null);  // 파일을 선택하지 않았을 경우 처리
			}
		}

	// 들어온 플로우 데이터값을 정렬
	const handleSort = () => { 
    setSort((prevSort) => (prevSort === "az" ? "za" : "az"));
		if (sort === "az") {
			const sorted = [...flow].sort((a, b) => a.id - b.id);
			setSortedFlow(sorted);
		} else {
			const sorted = [...flow].sort((a, b) => b.id - a.id);
			setSortedFlow(sorted);
		}
  };

	// 플로우 검색 기능 구현
	
	const handleSearch = (searchQuery) => {
			const filteredFlow = FlowData.filter(
				(item) =>
					(item.content && item.content.includes(searchQuery)) ||
					(item.location && item.location.includes(searchQuery))
			);
			setSortedFlow(filteredFlow);
		};
	

	const handleSearchChange = (e) => {
		const { value } = e.target;
		setSearchValue(value);
		if (value === "") {
			setSortedFlow(FlowData);
		} else {
			handleSearch(value);
		}
  };
	
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  
	const handleImageSelect = (event) => {
	  const file = event.target.files[0];
  
	  if (file && file.type.startsWith("image/")) {
		const reader = new FileReader();
  
		reader.onload = (e) => {
		  setThumbnailSrc(e.target.result);
		};
  
		reader.readAsDataURL(file);
	  } else {
		setThumbnailSrc("");
	  }
	};
  
	
	


    return(
			<MyFlowDiv>
				     <div className="controlDiv">
        				<CloseButton onClick={onClose}/>
      				</div>
				<MyFlowMenuName>
					<p className="title">myFlow</p>
					<CreateBtn onClick={openFlowModal}>
					<AiOutlinePlus style={{ color: 'grey' }}></AiOutlinePlus>
				</CreateBtn>
				</MyFlowMenuName>
				
				<MenuBar>
				<SearchBarInput type="text" className="nicknameInput" value={searchValue} onChange={handleSearchChange} />
					<MenuButtonWrapper>
					
						<CheckButton>
							<CheckImg />
						</CheckButton>

						<SearchButton>
							<SearchImg />
						</SearchButton>

						<SortButton onClick={handleSort}>
							{sort === "az" ? <SortAz /> : <SortZa />}
						</SortButton>
					</MenuButtonWrapper>	
				</MenuBar>
				<ScrollBar >
          <FlowDiv>
					
            {sortedFlow.map((item) => (
              <MyFlowContainer
								className="myFlowContainer"
                key={item.id}
                id={item.id}
                img={item.src}
                time={item.time}
                content={item.content}
                location={item.location}
								date={item.date}
              />
            ))}
          </FlowDiv>
        </ScrollBar>
		<FlowModal
        open={flowModalOpen}
        close={closeFlowModal}
        header="Flow"
        type="y"
      	>
        <textarea className="flowArea"
          value={flowModalText}
          onChange={(e) => setFlowModalText(e.target.value)}
        />
				
				<FileBox>
					<div className="filebox">
						{thumbnailSrc !== "" && (
								<img id="thumbnail" src={thumbnailSrc} alt="" className="thumbnail" />
						)}
							<label for="file"><PictureImg /></label> 
							<input type="file" onChange={handleImageSelect} className="fileSelect" id="file"/>
					</div>
				</FileBox>
				


    </FlowModal>
		<Modal open={modalOpen} close={closeModal} header="SpotFlow" type={"type"} confirm={closeBoth}>{modalText}</Modal>
	</MyFlowDiv>
    );
};

export default MyFlow;