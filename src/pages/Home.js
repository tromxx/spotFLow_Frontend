import React, {useState} from "react";
import {styled} from 'styled-components';
import KakaoMap from "../components/KakaoMap";
import ToSpot from "./eventHandler";
import {SlMenu} from "react-icons/sl";
import {FaMapMarkerAlt} from "react-icons/fa";
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
    width: 120px;
    height: 40px;
    position: absolute;
    display: flex;
    background-color: #61dafb;
    color: white;
    z-index: 2;
    text-align: center;
    line-height: 1.8;
    padding: 5px;
    border-radius: 40px;
  }

  .to-spot {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: white;
    margin-right: 10px;
    padding: 5px;
  }

  .to-spot:hover {
    background-color: #ccc;
  }

  .to-timeline:hover {
    background-color: #00b4d8;
  }
`;

const SidebarButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  top: 20px;
  left: 50px;
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
  z-index: 50;
  top: 0px;
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
    width: 35px;
    height: 35px;
    background-image: url(${setting});
    background-size: cover;
    background-color: transparent;
    border: none;
    transition: transform 0.5s ease;
    transform: ${({ isClicked }) => (isClicked ? 'rotate(120deg)' : 'rotate(5deg)')};
    &:hover {
      cursor: pointer;
    }
    
`;

const Input = styled.input`

`;

const ButtonMenu = styled.button`
  font-family: var(--efont);
  font-size: 30px;
  font-weight: 900;
  position: absolute;
  border: none;
  background-color: transparent;
  background-size: auto;
  background-repeat: no-repeat;
  width: 250px;
  height: 40px;
  
  
  &:hover {
    cursor: pointer;
  }
  
  &.MyFlow {
    top: 350px;
    left: 100px;
  }

  &.Diary {
    top: 450px;
    left: 100px;
  }

  &.Theme {
    top: 550px;
    left: 100px;
  }
`;



const Home = () => {
  // 핫 플레이스 이름, 경도, 위도 데이터를 저장한 배열
  const place = ToSpot.getPlace();
  let value = 2; //toSpot 버튼의 간격을 조절해주는 초기 값
  let count = 0; //toSpot 버튼의 개수를 카운팅

  const toSpot_position = (input) => { //toSpot 간격을 조절하는 함수
    count+=1;
    value += count + 10;
    return input;
  };


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

  // 다크모드 / 라이트모드 변경

  const [mode, setModeText] = useState("Dark Mode");

  const Mode = () => {
    if (mode === "Dark Mode") {
      setModeText("Light Mode");
    } else {
      setModeText("Dark Mode");
    }
  };


  return (
    <HomeDiv>
      <KakaoMap/>
      {place.map(p => (
        <div className="hot-place to-timeline" style={{top:'20px', right:toSpot_position(value) + 'vw'}}>
          <div className="to-spot"><FaMapMarkerAlt size={20} color="#000000"/></div>
          {p.location}
        </div>
      ))}

      <SidebarButton onClick={moveLeft}>
          <MenuImg/>
        </SidebarButton>
      <div className="hot-place to-timeline">강남구</div>


      <Sidebar translateX={translateX}>
        <CloseButton onClick={moveRight}></CloseButton>

        <MyInfo>
          <EditButton onClick={handleClick} isClicked={isClicked}></EditButton>
          <div className="profileImg"></div>
          <ButtonMenu className="MyFlow">myFlow</ButtonMenu>
          <ButtonMenu className="Diary">Diary</ButtonMenu>
          <ButtonMenu className="Theme" onClick={Mode}>{mode}</ButtonMenu>
        </MyInfo>



      </Sidebar>
    </HomeDiv>
  );
};

export default Home;