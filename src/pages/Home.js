import React, {useState} from "react";
import {styled} from 'styled-components';
import {SlMenu} from "react-icons/sl";
import close from "../images/close.png"
import defProfile from "../images/default_avatar.png"
import setting from "../images/setting.png"
import {useTheme} from "../context/themeProvider";
import DarkSetting from "../images/DarkSetting.png"
import {useNavigate  } from "react-router-dom";
import MapView from "./MapView";

const HomeDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  border: ${props => props.theme.borderColor};

  z-index: 1;

  * {
    box-sizing: border-box;
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
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  border-right: ${props => props.theme.borderColor};
  transition: background-color 0.5s ease, transform 0.6s ease;
  transform: translateX(${({translateX}) => translateX});
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
    top: 50px;
    justify-content: space-evenly;
    background-image: url(${defProfile});
    width: 8vw;
    height: 8vw;
    min-width: 120px;
    min-height: 120px;
    background-size: cover;
  }

  .nicknameInput {
    color: ${props => props.theme.textColor};
    position: absolute;
    top: 190px;
    width: fit-content;
    height: 25px;
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
  }

  
  input:focus {
  outline: none;
  }
`;

const StatusMsgWrapper = styled.div`
    color: ${props => props.theme.textColor};
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 10px;
    position: absolute;
    top: 270px;
    width: 250px;
    height: 50px;
    border: ${props => props.theme.borderColor === '1px solid #424242' ? '1px solid #d9d9d9' : '1px solid #424242'};
    border-radius: 8px;
    background-color: transparent;
    box-sizing: border-box;

    textarea {
      font-family: var(--kfont);
      width: 250px;
      height: 50px;
      margin: 0px;
      padding: 0px;
      background-color: transparent;
      border: none;
      resize: none;
      outline: none;
      padding: 1px;
      
    }
    textarea:focus {
    outline: none;
    }
`;

const FollowWrapper = styled.div`
  position: absolute;
  top: 230px;
  
  label {
    margin-left: 20px;
  }

  input {
    color: ${props => props.theme.textColor};
    width: 50px;
    height: 30px;
    border: none;
    background-color: transparent;
    margin-left: 10px;
    font-size: 1rem;
  }
  input:hover {
    cursor: pointer;
  }
  input:focus {
  outline: none;
  }
`;



const EditButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 3vw;
  left: 50px;
  width: 35px;
  height: 35px;
  background-size: cover;
  background-color: transparent;
  border: none;
  transition: transform 0.7s ease;
  transform: ${({isClicked}) => (isClicked ? 'rotate(120deg)' : 'rotate(5deg)')};

  &:hover {
    cursor: pointer;
  }

`;

const EditImg = styled.img`
  width: 35px;
  height: 35px;
`;

const ButtonMenu = styled.button`
  font-family: var(--efont);
  font-size: 25px;
  font-weight: 900;
  position: absolute;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.textColor};
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
    top: 420px;
    left: 100px;
  }

  &.Theme {
    top: 490px;
    left: 100px;
  }
`;


const Home = ({children}) => {

  const navigate = useNavigate();

  // 사이드바 가로이동
  const [translateX, setTranslateX] = useState("-50vw");

  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-100vw");
  };


  // 정보 수정 관련 요소들

  // 정보 수정 톱니바퀴 눌렀을 때 톱니바퀴 회전
  // 정보 수정 톱니바퀴를 눌렀을 떄 readOnly 속성을 바꿈
  // 상태메시지 관련 
  const [statusMsgValue, setStatusMsgValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [nicknameValue, setNicknameValue] = useState("");
  const [isBorderVisible, setIsBorderVisible] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsReadOnly(!isReadOnly);
  };

  const handleStatusMsgChange = (e) => {
    setStatusMsgValue(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNicknameValue(e.target.value);
  }

  const handleBorderVisible = () => {
    setIsBorderVisible(!isBorderVisible);
  };

  // 다크모드 / 라이트모드 변경
  const [ThemeMode, setTheme] = useTheme();

  
  


  const goFollowing = () => {
    navigate("/followingfollow")
  }

  return (
    <HomeDiv>
      <MapView/>

      <SidebarButton onClick={() => moveLeft()}>
        <MenuImg/>
      </SidebarButton>


      <Sidebar translateX={translateX}>
        <CloseButton onClick={() => moveRight()}></CloseButton>

        <MyInfo>
          <EditButton onClick={() => handleClick()} isClicked={isClicked}>
            <EditImg src={ThemeMode === 'dark' ? DarkSetting : setting}/>
          </EditButton>
          <div className="profileImg"></div>
            <input type="text" className="nicknameInput" value={nicknameValue} readOnly={isReadOnly} onChange={handleNicknameChange} />
          <FollowWrapper>
            <label htmlFor="following">following</label>
            <input type="text" id="following" value={"225"} readOnly onClick={goFollowing}/>
            <label htmlFor="follower">follower</label>
            <input type="text" id="follower" value={"850"} readOnly onClick={goFollowing}/>
          </FollowWrapper>
          <StatusMsgWrapper>
            <textarea name="statusMsg" id="statusMsg" cols="20" rows="2" spellcheck="false" readOnly={isReadOnly} value={statusMsgValue} onChange={handleStatusMsgChange}></textarea>
          </StatusMsgWrapper>
          

        </MyInfo>
        <ButtonMenu className="MyFlow">myFlow</ButtonMenu>
        <ButtonMenu className="Diary">Diary</ButtonMenu>
        <ButtonMenu className="Theme" onClick={setTheme}
                    mode={ThemeMode}>{ThemeMode === "light" ? "Light Mode" : "Dark Mode"}</ButtonMenu>
      </Sidebar>
    </HomeDiv>
  );
};

export default Home;