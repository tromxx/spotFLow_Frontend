import React from "react";
import {styled} from 'styled-components';
import HeaderBar from "../components/HeaderBarNavi";
import KakaoMap from "../components/KakaoMap";
import { SlMenu } from "react-icons/sl";
import { useState } from "react";
import close from "../images/close.png"
import defProfile from "../images/default_avatar.png"
import setting from "../images/setting.png"

const HomeDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;

  * {
    box-sizing: border-box;
  }

  .to-timeline {
    width: 5vw;
    height: 2vw;
    top: 300px;
    left: 300px;
    position: absolute;
    background-color: #00b4d8;
    color: white;
    z-index: 2;
    text-align: center;
    padding: 10px 0;
  }
`;

const SidebarButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  top: 80px;
  left: 100px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

`;



const MenuImg = styled(SlMenu)`
  width: 30px;
  height: 30px;
  margin-left: -5px;
`;


// 여기서부터 사이드바 안쪽 

const Sidebar = styled.div`
 
  display: block;
  width: 30vw;
  height: 100%;
  position: absolute;
  z-index: 999;
  top: 52px;
  left: 0;
  background-color: white;
  border-right: 1px solid #d9d9d9;
  transition: transform 0.3s ease;
  transform: translateX(${({ translateX }) => translateX});
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 3;
  top: 80px;
  left: 100px;
  border: none;
  background-color: transparent;
  background-image: url(${close});
  left: 26vw;
  top: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const MyInfo = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;

  .profileImg {
    position: absolute;
    top: 3vw;
    background-image: url(${defProfile});
    width: 8vw;
    height: 8vw;
    background-size: cover;
  }

  
`;

const EditButton = styled.button`
   position: absolute;
    top: 3vw;
    left: 50px;
    width: 30px;
    height: 30px;
    background-image: url(${setting});
    background-size: cover;
    background-color: transparent;
    border: none;
    transition: transform 0.5s ease;
    transform: ${({ isClicked }) => (isClicked ? 'rotate(120deg)' : 'rotate(0)')};
    &:hover {
      cursor: pointer;
    }
    
`;


const Home = () => {

  // 사이드바 가로이동
  const [translateX, setTranslateX] = useState("-30vw");

  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-30vw");
  };
  

  // 정보 수정 버튼을 눌렀을 때 톱니바퀴가 회전
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(!isClicked);
  };


  return (
    <HomeDiv>
      <HeaderBar/>
      <KakaoMap/>
      
      <SidebarButton onClick={moveLeft}>
          <MenuImg/>
        </SidebarButton>
      <div className="hot-place to-timeline">강남구</div>


      <Sidebar translateX={translateX}>
        <CloseButton onClick={moveRight}></CloseButton>

        <MyInfo>
          <EditButton onClick={handleClick} isClicked={isClicked}></EditButton>
          <div className="profileImg"></div>
        </MyInfo>
        
      </Sidebar>
    </HomeDiv>
  );
};

export default Home;