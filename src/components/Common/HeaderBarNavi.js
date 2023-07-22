import { styled } from 'styled-components';
import Logo from '../../images/logo.png';
import { useNavigate } from "react-router";
import DarkLogo from "../../images/DarkLogo.png"
import { useTheme } from "../../context/themeProvider";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";
import {BiExit} from 'react-icons/bi'

const HeaderBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--efont);
  font-size: 23px;
  border-bottom: ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;
  position: absolute;
  z-index: 4;
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
  padding-left: 80px;
`;

const LoggedInDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 65px;
  gap: 15px;
  p{
    cursor: pointer;
    &:hover{
      color: var(--lightblue);
    }
  }
`;

const Exit = styled(BiExit)`
  width: 30px;
  height: 30px;
  margin-top: 4px;
  &:hover{
    color: var(--lightblue);
  }
`;


const HeaderBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ThemeMode, setTheme] = useTheme();
  const{nickname, isLoggedIn, setIsLoggedIn} = useContext(UserContext);

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
          <p onClick={()=>navigate("/changeinfo")}>{nickname}</p>
          <Exit onClick={logOut}/>
        </LoggedInDiv>
        :
        <LoggedOutDiv>
          <p onClick={()=>navigate("/login")}>Login</p>
          <p>|</p>
          <p onClick={()=>navigate("/signup")}>Sign up</p>
        </LoggedOutDiv>
      }
    </HeaderBarDiv>
  );
};

export default HeaderBar;
