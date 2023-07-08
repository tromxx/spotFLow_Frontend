import React from 'react';
import {styled} from 'styled-components';
import {useTheme} from "../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react';
import {RxGear} from 'react-icons/rx'
import {BsCamera} from 'react-icons/bs'
import ProfileData from '../dataSet/ProfileData';
<<<<<<< HEAD
=======
import { storage } from '../api/FirebaseApi';

>>>>>>> 2a151ec5102108f6577bacc30cfa6fc372a733d5

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
  border: ${props=>props.theme.borderColor};
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
    text-align: center;
  }
  .profileDiv{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    textarea{
      color: ${props => props.theme.textColor};
      resize: none;
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

const Caption = styled.div`
  position: absolute;
  display: flex;
  margin-top: 98px;
  width: 123px;
  height: 30px;
  border-radius: 0 0 130px 130px;
  background-color: rgba(0, 0, 0, .6);
  z-index: 5;
  display: ${({ isBorderVisible }) => (isBorderVisible ? 'block' : 'none')};
  input{
    display: none;
  }
`;

const Statusmsg = styled.div`
  border: ${({ isBorderVisible }) => (isBorderVisible ? '1px solid gray' : 'none')};
  transition: 0.6s ease;
  border-radius: 8px;
  background-color: transparent;
  box-sizing: border-box;
`;


const Paragrph = styled.p`
transform: ${({ isActive }) => `translateX(${isActive ? 0 : -500}%)`};
  &:hover{
    cursor: pointer;
  }
  &.NickName{
    transition: transform 1.8s ease;
  }
  &.Following{
    transition: transform 2.8s ease;
  }
  &.Statusmsg{
    transition: transform 2.8s ease;
  }
`
const Menu = styled.h1`
  transform: ${({ isActive }) => `translateX(${isActive ? 0 : -200}%)`};
  &:hover {
    cursor: pointer;
    color : var(--lightblue);
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

// 톱니버튼 CSS
const ControlButton = styled(RxGear)`
  width: 30px;
  height: 30px;
  transition: transform 0.7s ease;
  transform: ${({isActive}) => (isActive ? 'rotate(120deg)' : 'rotate(5deg)')};
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

//프로파일 이미지 업로드 수정
const CameraButton = styled(BsCamera)`
  width: 25px;
  height: 25px;
  position: absolute;
  margin-left: 49px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;


const MyPage = ({ onClose, goToMyFlow }) => {
  const [ThemeMode, setTheme] = useTheme(); // black white 변경
  const [active, setIsActive] = useState(true); //정부 수정시 
  const [isBorderVisible, setIsBorderVisible] = useState(false); // 정보 수정 톱니바퀴를 눌렀을 때 닉네임 input의 border 보이게 할 것인지
  const [image, setImage] = useState("https://mblogthumb-phinf.pstatic.net/MjAyMTEwMTdfMzUg/MDAxNjM0NDAzMDA2ODMy.GHw5PZcGfKmsLaDNHB0dx4pyfEpAkrjykogrswNUgQ4g.Plyxj3MecKqu5GD4Ci2Fi88WHPaZDeq4NqQwppwLxC8g.PNG.rpgrr123/1c8058f087fec5fd9da8aaa66db0eb1ac16a9cc711e0c50dd8f5ccf86e0a43555012746e984f741b26a1035bcc8a4b868ce41c5b890559368b10c0568f11c5c9481dbc596144bb3999cc2dcbb2af0400c1301e4ecab63758036a2afc4830aececf2ad6402c8938d910c4c8ebed4af447.png?type=w800");
  const [status , setStatus] = useState("tesing")
  const [MyPageData, setMyPageData] = useState(ProfileData); //Backend 연결 필요
  const navigate = useNavigate();
  
  console.log(MyPageData)
  
  const handleClick = () => {
    setIsActive(!active);
    setIsBorderVisible(!isBorderVisible);
    setStatus("");
  };
  
  const handleStatusMsg = (event) =>{
    setStatus(event.target.value);
  }




  return (
    <MyInfoDiv>
      <div className="controlDiv">
        <ControlButton onClick={handleClick} isActive={active} />
        <CloseButton onClick={onClose} />
      </div>
      <div className='profileDiv'>
        <img src={image} alt="" />
        <Caption isBorderVisible={isBorderVisible}>
          <input type="file" accept='image/*' />
          <CameraButton/>
        </Caption>
        <Paragrph isActive={active} className='NickName'>Trom</Paragrph>
        <div className='followingfollowerDiv'>
          <Paragrph isActive={active} className='Following'>Following : 100</Paragrph>
          <Paragrph isActive={active} className='Following'>Follower : 200</Paragrph>
        </div>
        <Statusmsg isBorderVisible={isBorderVisible}>
        <textarea
          cols="20"
          rows="2"
          value={status}
          spellCheck="false"
          onChange={handleStatusMsg}
          readOnly={active}
        ></textarea>
        </Statusmsg>
      </div>
      <div className='routeDiv'>
        <Menu onClick={goToMyFlow} isActive={active} className='MyFlow'>my<span style={{color : "skyblue"}}>F</span>low</Menu>
        <Menu onClick={()=>navigate("/diary")} isActive={active} className='Diary'>Diary</Menu>
        <Menu isActive={active} onClick={setTheme} mode={ThemeMode} className='Theme' >{ThemeMode === "dark" ? "Light Mode" : "Dark Mode"}</Menu>
      </div>
    </MyInfoDiv>
  );
};

export default MyPage;
