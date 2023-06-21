import React, {useState} from "react";
import {styled} from 'styled-components';
import {SlMenu} from "react-icons/sl";
import close from "../images/close.png"
import defProfile from "../images/default_avatar.png"
import setting from "../images/setting.png"
import {useTheme} from "../context/themeProvider";
import DarkSetting from "../images/DarkSetting.png"
import { useNavigate  } from "react-router-dom";
import MapView from "./MapView";
import SideBarMain from "../components/SidebarMain";

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

const Home = ({children}) => {

  const navigate = useNavigate();

  // 사이드바 가로이동
  const [translateX, setTranslateX] = useState("-100vw");

  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-100vw");
  };


  return (
    <HomeDiv>
      <MapView/>

      <SidebarButton onClick={() => moveLeft()}>
        <MenuImg/>
      </SidebarButton>


      <Sidebar translateX={translateX}>
        <CloseButton onClick={() => moveRight()}></CloseButton>
      <SideBarMain />
      
      </Sidebar>
    </HomeDiv>
  );
};

export default Home;