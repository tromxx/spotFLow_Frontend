import React, {useState} from "react";
import {styled} from 'styled-components';
import defProfile from "../images/default_avatar.png"
import setting from "../images/setting.png"
import {useTheme} from "../context/themeProvider";
import DarkSetting from "../images/DarkSetting.png"
import { useNavigate } from "react-router-dom";

const MyInfo = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
	top: 7vh;
  
  .profileImg {
    position: absolute;
    top: 100px;
    justify-content: space-evenly;
    background-image: url(${defProfile});
    width: 8vw;
    height: 8vw;
    min-width: 120px;
    min-height: 120px;
    background-size: cover;
  }
`;

const NicknameInput = styled.input`
  position: absolute;
  color: ${props => props.theme.textColor};
  border: ${props =>
  props.isBorderVisible
    ? props.theme.borderColor === '1px solid #424242' ? '1px solid #d9d9d9' : '1px solid #424242'
    : 'transparent'};
  transition: 0.6s ease;
  top: 250px;
  width: 150px;
  height: 35px;
  border-radius: 8px;
  background-color: transparent;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  outline: none;
  box-shadow: none;
  &:focus {
    outline: none;
  }
`

const StatusMsgWrapper = styled.div`
    color: ${props => props.theme.textColor};
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 10px;
    position: absolute;
    top: 340px;
    width: 250px;
    height: 50px;
    border: ${props =>
      props.isBorderVisible
      ? props.theme.borderColor === '1px solid #424242' ? '1px solid #d9d9d9' : '1px solid #424242'
      : 'transparent'};
    transition: 0.6s ease;
    border-radius: 8px;
    background-color: transparent;
    box-sizing: border-box;

    textarea {
      color: ${props => props.theme.textColor};
      font-family: var(--kfont);
      width: 250px;
      height: 50px;
      margin: 0px;
      padding: 0px;
      background-color: transparent;
      border: none;
      resize: none;
      outline: none;
      padding: 2px;
    }
    textarea:focus {
    outline: none;
    }
`;

const FollowWrapper = styled.div`
  position: absolute;
  top: 280px;
  display: flex;
  gap: 30px;
  label:hover{
    color: var(--blue);
    border: 1px solid black;
  }
`;

const EditButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 80px;
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
  transform: translateX(${({transMenuX}) => transMenuX});

  &:hover {
    cursor: pointer;
  }

  &.MyFlow {
    top: 420px;
    left: 100px;
    transition: transform 0.3s ease;
  }

  &.Diary {
    top: 490px;
    left: 100px;
    transition: transform 0.7s ease;
  }

  &.Theme {
    top: 560px;
    left: 100px;
    transition: transform 1.0s ease;
  }
`;

const ButtonMenuWrapper = styled.div`
  
`;

const InfoInput = styled.input`
  color: ${props => props.theme.textColor};
  font-family: var(--kfont);
  position: absolute;
  width: 250px;
  height: 40px;
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  border: ${props =>
  props.isBorderVisible
    ? props.theme.borderColor === '1px solid #424242' ? '1px solid #d9d9d9' : '1px solid #424242'
    : 'transparent'};
  transform: translateX(${({transInfoEditX}) => transInfoEditX});  
  &.password {
    top: 420px;
    left: 105px;
    transition: transform 0.3s ease;
  }
  &.newPassword {
    top: 490px;
    left: 105px;
    transition: transform 0.7s ease;
  }
  &.newPasswordConfirm {
    top: 560px;
    left: 105px;
    transition: transform 1.0s ease;
  }
  &:focus {
    outline: none;
  }
`;

const SaveButton = styled.button`
  transform: translateX(${({transInfoEditX}) => transInfoEditX});  
  background-color: #00B4D8;
  font-family: var(--kfont);
  color: white;
  position: absolute;
  width: 255px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: transform 1.3s ease;
  top: 630px;
  left: 105px;
  border: none;
  &:hover {
    background-color: #0096C7;
    transition: background-color 0.5s ease
  }
`;

const SideBarMain = ({ handleMyFlow, handleFollowerFollowing, follower, following }) => {
  // 정보 수정 관련 요소들
  const [statusMsgValue, setStatusMsgValue] = useState("");  // 상태메시지 관련
  const [isClicked, setIsClicked] = useState(false);   // 정보 수정 톱니바퀴 눌렀을 때 톱니바퀴 회전
  const [isReadOnly, setIsReadOnly] = useState(true);  // 정보 수정 톱니바퀴를 눌렀을 때 readOnly 속성을 바꿈
  const [nicknameValue, setNicknameValue] = useState(""); // 닉네임 값
  const [isBorderVisible, setIsBorderVisible] = useState(false); // 정보 수정 톱니바퀴를 눌렀을 때 닉네임 input의 border 보이게 할 것인지
  const [transMenuX, setTransMenuX] = useState("0"); // 정보 수정 톱니바퀴를 눌렀을 때 원래 존재하는 메뉴들의 이동
  const [transInfoEditX, setTransInfoEditX] = useState("-50vw"); // 정보 수정 톱니바퀴를 눌렀을 때 비밀번호 수정 창의 이동
  const [ThemeMode, setTheme] = useTheme(); // 다크모드 / 라이트모드 변경
  const navigate = useNavigate(); //Diary navigate 추가

  const handleClick = () => {
    setIsClicked(true);
    setIsReadOnly(false);
    setIsBorderVisible(true);
    setTransMenuX("-50vw");
    setTransInfoEditX("0");
  };

  const handleStatusMsgChange = (e) => {
    setStatusMsgValue(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNicknameValue(e.target.value);
  }

  const handleSave = () => {
    setIsClicked(false);
    setTransMenuX("0");
    setIsReadOnly(true);
    setIsBorderVisible(false);
    setTransInfoEditX("-50vw");
  }
  
  // Diary navigate 추가
  const goToDiary = () =>{
    navigate("/diary");
  }

  const goToFollower = () =>{
    localStorage.setItem('follower', 'follower');
    handleFollowerFollowing();
  };

  const goToFollowing = () =>{
    localStorage.setItem('following', 'following');
    handleFollowerFollowing();
  };

  return (
    <MyInfo>
      <EditButton onClick={() => handleClick()} isClicked={isClicked}>
        <EditImg src={ThemeMode === 'dark' ? DarkSetting : setting}/>
      </EditButton>
      <div className="profileImg"></div>
        <NicknameInput type="text" className="nicknameInput" value={nicknameValue} readOnly={isReadOnly} onChange={handleNicknameChange} isBorderVisible={isBorderVisible} />
      <FollowWrapper isBorderVisible={isBorderVisible}>
        <label onClick={goToFollower}>follower : {follower}</label>
        <label onClick={goToFollowing}>following : {following}</label>
      </FollowWrapper>
      <StatusMsgWrapper  isBorderVisible={isBorderVisible}>
        <textarea name="statusMsg" id="statusMsg" cols="20" rows="2" spellcheck="false" readOnly={isReadOnly} value={statusMsgValue} onChange={handleStatusMsgChange}></textarea>
      </StatusMsgWrapper>
      <ButtonMenuWrapper >
        <ButtonMenu transMenuX = {transMenuX} className="MyFlow" onClick={handleMyFlow}>myFlow</ButtonMenu>
        <ButtonMenu transMenuX = {transMenuX} className="Diary" onClick={goToDiary}>Diary</ButtonMenu>
        <ButtonMenu transMenuX = {transMenuX} className="Theme" onClick={setTheme}
          mode={ThemeMode}>{ThemeMode === "light" ? "Light Mode" : "Dark Mode"}
        </ButtonMenu>
    	</ButtonMenuWrapper>
			<InfoInput transInfoEditX = {transInfoEditX} className="password" placeholder="비밀번호" isBorderVisible={isBorderVisible}/>
			<InfoInput transInfoEditX = {transInfoEditX} className="newPassword" placeholder="새 비밀번호" isBorderVisible={isBorderVisible}/>
			<InfoInput transInfoEditX = {transInfoEditX} className="newPasswordConfirm" placeholder="새 비밀번호 확인" isBorderVisible={isBorderVisible}/>
			<SaveButton transInfoEditX = {transInfoEditX} onClick={handleSave}>저장하기</SaveButton>
    </MyInfo>
  );
};

export default SideBarMain;
