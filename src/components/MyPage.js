import {styled} from 'styled-components';
import {useTheme} from "../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineLogin } from 'react-icons/ai'
import { useState } from 'react';
import {RxGear} from 'react-icons/rx'
import {BsCamera} from 'react-icons/bs'
import { useContext } from 'react';
import { UserContext } from '../context/UserStore';
import Logo from "../images/logo.png"

const LogInDiv = styled.div`
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
  font-family: var(--efont);
  .controlDiv{
    margin-top: 15px;
    display: flex;
    gap: 250px;
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

const LogOutDiv=styled.div`
  width: 390px;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  border-right: 1px solid var(--grey);
  background-color: white;
  font-family: var(--efont);
  .controlDiv{
    margin-top: 15px;
    display: flex;
    gap: 250px;
  }
  .logoutdivService{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: bolder;
    margin-top: 200px;
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
transform: ${props  => `translateX(${props.isActive ? 0 : -500}%)`};
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
  transform: ${props => `translateX(${props.isActive ? 0 : -200}%)`};
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
  color: var(--grey);
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
  color: var(--grey);
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
  `;

//login 버튼 css
const LoginButton = styled(AiOutlineLogin)`
  width: 35px;
  height: 35px;
  color: var(--grey);
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
  color: var(--grey);
  margin-left: 49px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;




const MyPage = ({ onClose, goToMyFlow }) => {
  const [ThemeMode, setTheme] = useTheme(); 
  const [isActive, setIsActive] = useState(true);  
  const [isBorderVisible, setIsBorderVisible] = useState(false); 
  const [status , setStatus] = useState("tesing")
  const navigate = useNavigate();
  const{nickname, profilePic, statMsg, isLoggedIn} = useContext(UserContext)
  
  const handleClick = () => {
    setIsActive(!isActive);
    setIsBorderVisible(!isBorderVisible);
    setStatus("");
  };
  
  const handleStatusMsg = (event) =>{
    setStatus(event.target.value);
  }
  return (
    <>
    {isLoggedIn ? 
      <LogInDiv>
        <div className="controlDiv">
          <ControlButton onClick={handleClick} isActive={isActive} />
          <CloseButton onClick={onClose} />
        </div>
      </LogInDiv>
        :
      <LogOutDiv>
        <div className="controlDiv">
          <LoginButton onClick={()=>navigate("/login")}/>
          <CloseButton onClick={onClose} />
        </div>
        <div className="logoutdivService">
          <img src={Logo} alt="" />
          <p>로그인이 필요한 서비스입니다.</p>
        </div>
      </LogOutDiv>
      }
    </>
  );
};

export default MyPage;
