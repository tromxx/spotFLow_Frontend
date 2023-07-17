import { styled } from 'styled-components';
import Logo from '../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../images/DarkLogo.png"
import { useTheme } from "../context/themeProvider";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import {BiExit} from 'react-icons/bi'
import { useEffect } from "react";
import CustomerApi from '../api/CustomerApi'; 

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
  z-index: 5;
`;

const LoggedOutDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 3vw;
  gap: 15px;
  cursor: pointer;
  p:nth-child(odd):hover{
    color: var(--lightblue);
  }
`

const LogoImg = styled.img`
  width: 20vh;
  min-width: 150px;
  cursor: pointer;
  padding-left: 35px;
`;

const LoggedInDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 65px;
  gap: 15px;
`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 30px;
  &:hover{
    color: var(--lightblue);
  }
`;


const HeaderBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  const{setEmail, nickname, setNickname,setProfilePic,setStatMsg, isLoggedIn, setIsLoggedIn} = useContext(UserContext);

  useEffect(() => {
    console.log("UseEffect Activated");
    const token = localStorage.getItem('authToken');
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.email);
          setNickname(response.data.nickName);
          setProfilePic(response.data.profilePic);
          setStatMsg(response.data.statMsg);
          setIsLoggedIn(true);
        } catch (error) {
          throw error;
        }
      }else{
        return null;
      }
    };
    getCustomerInfo();
  }, []);

  const logOut = () =>{
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <HeaderBarDiv>
      <LogoImg
        src={ThemeMode === 'dark' ? DarkLogo : Logo}
        onClick={()=>navigate("/")}
      />
      {isLoggedIn ? 
        <LoggedInDiv>
          <p>{nickname}</p>
          <Exit onClick={logOut}/>
        </LoggedInDiv>
        :
        <LoggedOutDiv>
          <p onClick={()=>navigate("/login")}>Login</p>
          <p>/</p>
          <p onClick={()=>navigate("/signup")}>Sign up</p>
        </LoggedOutDiv>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;
