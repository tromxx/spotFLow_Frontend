import React, {useState} from "react";
import {styled} from 'styled-components';
import HeaderBar from "../components/HeaderBarNavi";
import KakaoMap from "../components/KakaoMap";
import ToSpot from "../dataSet/ToSpotData";
import {SlMenu} from "react-icons/sl";
import {FaMapMarkerAlt} from "react-icons/fa";
import close from "../images/close.png"
import defProfile from "../images/default_avatar.png"
import setting from "../images/setting.png"

const HomeDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;
  z-index: 1;
  * {
    box-sizing: border-box;
  }
  
`;
const ToSpotBtn = styled.div`
  transition: transform 0.5s ease;
  transform: translateY(${({translateY}) => translateY + "px"});
  position: absolute;
  font-family: 'Prompt', sans-serif;
  top: 20px;
  right: 150px;
  z-index: 2;

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
    background-color: #eee;
  }

  .to-spot:active {
    background-color: #ccc;
  }

  .hot-spot:hover {
    background-color: #10cfff;
  }

  .hot-spot:active {
    background-color: #00b4d8;
  }

  .more {
    background-color: #ccc;
    border: .3px solid rgb(0, 0, 0, 30);
    color: #000;
  }

  //800px 이하면 압축후 버튼으로 보이기 처리
  @media (max-width: 860px) {
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
  min-width: 450px;
  min-height: max-content;
  position: absolute;
  z-index: 50;
  top: 0px;
  left: 0;
  background-color: white;
  border-right: 1px solid #d9d9d9;
  transition: transform 0.5s ease;
  transform: translateX(${({ translateX }) => translateX});
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 3;
  top: 20px;
  right: 20px;
  border: none;
  background-color: transparent;
  background-image: url(${close});
  
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
    justify-content: space-evenly;
    background-image: url(${defProfile});
    width: 8vw;
    height: 8vw;
    min-width: 120px;
    min-height: 120px;
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
  transform: ${({isClicked}) => (isClicked ? 'rotate(120deg)' : 'rotate(5deg)')};

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
  // 사이드바 가로이동
  const [translateX, setTranslateX] = useState("-50vw");

  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-150vw");
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
  // 핫 플레이스 이름, 경도, 위도 데이터를 저장한 배열
  const place = ToSpot.getPlace();
  // toSpot 버튼 아이템 표시 여부 ex) 0 = false, 1 = true
  const [isToSpotBtnState, setIsToSpotBtnState] = useState(0);
  const btnToSpotMoreView = () => { // onClick 으로 표시 여부 핸들링
    if (isToSpotBtnState === 0) setIsToSpotBtnState(1);
    else setIsToSpotBtnState(0);
  }

  const [latitude, setLatitude] = useState(37.4923615);
  const [longitude, setLongitude] = useState(127.0292881);
 const toSpotFocus = (lat, lng) => {
   setLongitude(lng);
   setLatitude(lat);
 }

  return (
    <HomeDiv>
      <KakaoMap latitude={latitude} longitude={longitude}/>
      {place.map(p => (
        <ToSpotBtn translateY={(p.num * 50 * isToSpotBtnState)}>
          <div className={"hot-spot to-timeline"}>
            <div className="to-spot" onClick={() => toSpotFocus(p.lat, p.lng)}><FaMapMarkerAlt size={20} color="#000000"/></div>
            {p.location}
          </div>
        </ToSpotBtn>
      ))}
      <ToSpotBtn>
        <div className="to-timeline more" onClick={btnToSpotMoreView}>
          <div className="to-spot" style={{marginRight:"3px"}}><FaMapMarkerAlt size={20} color="#000000"/></div>
          TimeLine
        </div>
      </ToSpotBtn>

      <SidebarButton onClick={moveLeft}>
        <MenuImg/>
      </SidebarButton>


      <Sidebar translateX={translateX}>
        <CloseButton onClick={moveRight}></CloseButton>

        <MyInfo>
          <EditButton onClick={handleClick} isClicked={isClicked}></EditButton>
          <div className="profileImg"></div>
          
        </MyInfo>
          <ButtonMenu className="MyFlow">myFlow</ButtonMenu>
          <ButtonMenu className="Diary">Diary</ButtonMenu>
          <ButtonMenu className="Theme" onClick={Mode}>{mode}</ButtonMenu>
      </Sidebar>
    </HomeDiv>
  );
};

export default Home;