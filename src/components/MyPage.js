import {styled} from 'styled-components';
import {useTheme} from "../context/themeProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineLogin } from 'react-icons/ai'
import { useRef, useState } from 'react';
import {RxGear} from 'react-icons/rx'
import {BsCamera} from 'react-icons/bs'
import { useContext } from 'react';
import { UserContext } from '../context/UserStore';
import { storage } from '../api/FirebaseApi'
import CustomerApi from '../api/CustomerApi';

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
  }
  .followingfollowerDiv{
    display: flex;
    gap: 50px;
    margin: 0px;
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
  margin: 0px;
  padding: 0px;
  position: absolute;
  margin-top: 80px;
  width: 130px; 
  height: 65px; 
  border-radius: 0 0 70px 70px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
  display: ${props => (props.$isactive === "false" ? 'block' : 'none')};
  input {
    display: none;
  }
`;

const TextArea = styled.textarea`
  color: ${props => props.theme.textColor};
  position: absolute;
  margin-top: 300px;
  resize: none;
  font-family: var(--kfont);
  width: 300px;
  height: 70px;
  border-radius: 20px;
  text-align: center;
  resize: none;
  padding: 2px;
  display: ${props => (props.$isactive === "false" ? 'block' : 'none')};
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  color: white;
  font-weight: bold;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: var(--blue);
  display: ${props => (props.$isactive === "false" ? 'block' : 'none')};
  &:hover{
    color: var(--lightblue);
    cursor: pointer;
  }
`;

const Paragrph = styled.p`
  margin: 15px;
  transform: ${props  => `translateX(${props.$isactive === "true" ? 0 : -500}%)`};
  &.NickName{
    transition: transform 1.8s ease;
    font-size: 20px;
    font-weight: bolder;
  }
  &.Following{
    transition: transform 2.0s ease;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  }
  &.StatMsg{
    transition: transform 2.2s ease;
  }
  &.MyFlow {
    transition: transform 2.4s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  }
  &.Diary {
    transition: transform 2.6s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  } 
  &.Theme {
    transition: transform 2.8s ease;
    font-size : 30px;
    font-weight : bolder;
    &:hover {
      color: var(--lightblue);
      cursor: pointer;
    }
  }
`
// 톱니버튼 CSS
const ControlButton = styled(RxGear)`
  width: 30px;
  height: 30px;
  color: var(--grey);
  transition: transform 0.7s ease;
  transform: ${props => (props.$isactive === "true" ? 'rotate(120deg)' : 'rotate(5deg)')};

  &:hover {
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
  width: 30px;
  height: 30px;
  color: var(--grey);
  margin-top: 10px;
  margin-left: 49px;
  &:hover{
    cursor: pointer;
    color: var(--lightblue);
  }
`;

const MyPage = ({ onClose, goToMyFlow }) => {
  const [ThemeMode, setTheme] = useTheme(); 
  const [isactive, setIsActive] = useState(true);
  const [prevImgFile, setPrevImgFile] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [url, setUrl] = useState("");
  const imgRef = useRef();
  const navigate = useNavigate();
  const{nickname, profilePic, setProfilePic,statMsg,setStatMsg, isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  
  const handleClick = () => {
    setIsActive(!isactive);
    setPrevImgFile("");
    setImgFile(null);
  };
  
   const handleCameraClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const savePrevImgFile = (e) => {
    const file = imgRef.current.files[0];
    setImgFile(e.target.files[0]);
    const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPrevImgFile(reader.result);
          console.log();
       };
  };

  //여기다 로직 수정 필요
  const saveImgFile = async() => {
    const token = localStorage.getItem('authToken');
    
    if(imgFile === null){
      const updateData = {
        statMsg : statusMessage
      };
      try {
        const response = await CustomerApi.updateProfile(token,updateData);
        setStatMsg(response.data.statMsg);
        setIsLoggedIn(true);
        setIsActive(!isactive);
        setPrevImgFile("");
      } catch (error) {
        throw error;
      }
    }else if(statusMessage === ""){
      console.log("img activate")
      const storageRef = storage.ref();
      const fileRef = storageRef.child(imgFile.name);
      fileRef.put(imgFile).then(() => {
        console.log('File uploaded successfully!');
        fileRef.getDownloadURL().then((url) => {
          setUrl(url);
          console.log(url);
        });
      });
      const updateData = {
        profilePic : url,
      };
      try {
        const response = await CustomerApi.updateProfile(token,updateData);
        console.log("success")
        setProfilePic(response.data.profilePic);
        setIsLoggedIn(true);
        setIsActive(!isactive);
        setPrevImgFile("");
      } catch (error) {
        throw error;
      };
    }
  };
  

  return (
    <>
    {isLoggedIn ? 
      <LogInDiv>
        <div className="controlDiv">
          <ControlButton onClick={handleClick}  $isactive={isactive.toString()}  />
          <CloseButton onClick={onClose} />
        </div>
        <div className='profileDiv'>
        <img
              src={prevImgFile ? prevImgFile : profilePic || "/images/icon/user.png"}
              alt="프로필 이미지"
            />
          <Caption $isactive={isactive.toString()}>
            <input
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={savePrevImgFile}
              ref={imgRef}
            />
            <CameraButton onClick={handleCameraClick}/>
          </Caption>
          <Paragrph $isactive={isactive.toString()} className='NickName'>{nickname}</Paragrph>
          <div className='followingfollowerDiv'>
            <Paragrph $isactive={isactive.toString()} className='Following'>Following : 100</Paragrph>
            <Paragrph $isactive={isactive.toString()} className='Following'>Follower : 200</Paragrph>
         </div>
          <Paragrph $isactive={isactive.toString()} className='StatMsg'>{statMsg}</Paragrph>
        </div>
        <Paragrph onClick={goToMyFlow} $isactive={isactive.toString()} className='MyFlow'>Spot</Paragrph>
        <Paragrph onClick={()=>navigate("/diary")} $isactive={isactive.toString()} className='Diary'><span style={{color : "#00B4D8"}}>F</span>low</Paragrph>
        <Paragrph onClick={setTheme} $isactive={isactive.toString()} className='Theme' >{ThemeMode === "dark" ? "Light Mode" : "Dark Mode"}</Paragrph>
        <Button $isactive={isactive.toString() } onClick={saveImgFile}>저장하기</Button>
        <TextArea
          cols="20"
          rows="2"
          spellCheck="false"
          placeholder="상태 메시지를 입력하세요"
          onChange={(e)=> setStatusMessage(e.target.value)}
          $isactive={isactive.toString() }
        ></TextArea>
      </LogInDiv>
      :
      <LogOutDiv>
        <div className="controlDiv">
          <LoginButton onClick={()=>navigate("/login")}/>
          <CloseButton onClick={onClose} />
        </div>
        <div className="logoutdivService">
          <p>로그인이 필요한 서비스입니다.</p>
        </div>
      </LogOutDiv>
    }
    </>
  );
};

export default MyPage;