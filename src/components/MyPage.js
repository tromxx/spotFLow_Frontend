import React, { useRef } from 'react';
import {styled} from 'styled-components';
import {useTheme} from "../context/themeProvider";
import DarkSetting from "../images/DarkSetting.png"
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react';
import {RxGear} from 'react-icons/rx'
import MyFlow from '../images/myFlow.png'
import { useEffect } from 'react';

//SideDiv CSS 컴포넌트로 고정 값으로 사용할 예저 고민중
const MyInfoDiv = styled.div`
  width: 390px;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  border-right: 1px solid var(--grey);
  background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
  margin-top: 7vh;
  font-family: var(--efont);
  transition: 0.6s ease;
  .controlDiv{
    margin-top: 10px;
    display: flex;
    gap: 290px;
  }
  img{
    border-radius: 50%;
    width: 130px;
    height: 130px;
    margin-top: 15px;
    z-index: 5;
    float: left;
  }
  .caption{
    position: absolute;
    border: 1px solid black;
    margin-top: 15px;
    width: 129px;
    height: 129px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
  }
  .profileDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    textarea{
      resize: none;
      font-family: var(--kfont);
      width: 250px;
      height: 50px;
      margin: 0px;
      padding: 0px;
      background-color: transparent;
      border: 1px solid black
      resize: none;
      outline: none;
      padding: 2px;
    }
  }
  .profileDiv p:nth-child(3){
    font-weight: bold;
    font-size: 25px;
    height: 10px;
  }
  .followingfollowerDiv{
    display: flex;
    gap: 50px;
  }
  .modifyInputDiv{
    position: absolute;
    top: 100px;
    left: 100px;
  }
`;

const Paragrph = styled.p`
transform: ${({ isClicked }) => `translateX(${isClicked ? 0 : -500}%)`};
  &:hover{
    cursor: pointer;
  }
  &.NickName{
    transition: transform 1.2s ease;
  }
  &.Following{
    transition: transform 1.4s ease;
  }
  &.Statusmsg{
    transition: transform 1.6s ease;
  }
`
const Menu = styled.h1`
  transform: ${({ isClicked }) => `translateX(${isClicked ? 0 : -200}%)`};
  &:hover {
    cursor: pointer;
  }
  &.MyFlow {
    transition: transform 1.8s ease;
  }
  &.Diary {
    transition: transform 2.0s ease;
  } 
  &.Theme {
    transition: transform 2.2s ease;
  }
`

const InfoInput = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 8px;
  transform: ${({ isClicked }) => `translateX(${isClicked ? -200 : 0}%)`};
  &.password {
    top: 420px;
    left: 105px;
    transition: transform 1.0 ease;
  }
`;

// 톱니버튼 CSS
const ControlButton = styled(RxGear)`
  width: 30px;
  height: 30px;
  transition: transform 0.7s ease;
  transform: ${({isClicked}) => (isClicked ? 'rotate(120deg)' : 'rotate(5deg)')};
  &:hover{
    color: skyblue;
  }
`;

//close 버튼 CSS
const CloseButton = styled(AiOutlineClose)`
  width: 35px;
  height: 35px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;

const MyPage = ({ onClose, goToMyFlow}) => {
  const [ThemeMode, setTheme] = useTheme(); // 다크모드 라이트모드 State
  const [isClicked, setIsClicked] = useState(true);   // 정보 수정 톱니바퀴 눌렀을 때 톱니바퀴 회전 (이름 수정 필요)
  /*
    1. below state 값들 useMemo 또는 useRef 사용 필요
  */
  const [isReadOnly, setIsReadOnly] = useState(true);  // 정보 수정 톱니바퀴를 눌렀을 때 readOnly 속성을 바꿈
  const [isBorderVisible, setIsBorderVisible] = useState(false); // 정보 수정 톱니바퀴를 눌렀을 때 닉네임 input의 border 보이게 할 것인지
  
  const handleClick = () =>{
    setIsClicked(!isClicked); 
  }

  return (
    <MyInfoDiv>
      <div className="controlDiv">
        <ControlButton onClick={() => handleClick()} isClicked={isClicked}/>
        <CloseButton onClick={onClose}/>
      </div>
      <div className='profileDiv'>
        <img src="https://img.freepik.com/premium-psd/cute-dog-3d-illustration_541652-270.jpg" alt="" />
        <div className='caption'>
          <input type="file"/>
        </div>
        <Paragrph isClicked={isClicked} className='NickName'>Trom</Paragrph>
        <div className='followingfollowerDiv'>
          <Paragrph  isClicked={isClicked} className='Following'>Following : 100</Paragrph>
          <Paragrph isClicked={isClicked} className='Following'>Follower : 200</Paragrph>
        </div>
        <Paragrph isClicked={isClicked} className='Statusmsg'>Hello my name is trom</Paragrph>
      </div> 
      <div className='routeDiv'>
        <Menu onClick={goToMyFlow} isClicked = {isClicked} className='MyFlow'>my<span style={{color : "skyblue"}}>F</span>low</Menu>
        <Menu isClicked = {isClicked} className='Diary'>Diary</Menu>
        <Menu isClicked = {isClicked} onClick={setTheme} mode={ThemeMode} className='Theme' >{ThemeMode === "dark" ? "Light Mode" : "Dark Mode"}</Menu>
      </div>
      <div className='modifyInputDiv'>
      </div>
    </MyInfoDiv>
  );
};

export default MyPage;