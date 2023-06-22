import React, {useState} from "react";
import styled from 'styled-components';
import {SlMenu} from "react-icons/sl";
import close from "../images/close.png"
import { useNavigate  } from "react-router-dom";
import SideBarMain from "./SidebarMain";
import Following from "../pages/Following"
import Follower from "../pages/Follower"
import MyFlow from "../pages/MyFlow"
import { CSSTransition } from 'react-transition-group';
import FollowingFollowCounter from "./FollowingFollowCounter";


const SidebarButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  top: 80px;
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

const SideBarWrapper = styled.div`
`;

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

  .button {
    position: absolute;
    top: 100px;
    left: 50px;

  }
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 3;
  top: 70px;
  right: 20px;
  border: none;
  background-color: transparent;
  background-image: url(${close});

  &:hover {
    cursor: pointer;
  }
`;



const SideBar = ({ children }) => {

const navigate = useNavigate();

  // 사이드바 가로이동
  const [translateX, setTranslateX] = useState("-100vw");
  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-100vw");
  };


  const [renderMain, setRenderMain] = useState(true);
  const [renderFollowing, setRenderFollowing] = useState(false);
  const [renderFollower, setRenderFollower] = useState(false);
  const [renderMyFlow, setRenderMyFlow] = useState(false);

  const handleMyFlow = () => {
    setRenderMain(false);
    setRenderFollower(false);
    setRenderFollowing(false);
    setRenderMyFlow(true);
  }

  const handleFollowing = () => {
    setRenderMain(false);
    setRenderFollower(false);
    setRenderMyFlow(false);
    setRenderFollowing(true);
  }

  const handleFollower = () => {
    setRenderMain(false);
    setRenderFollowing(false);
    setRenderMyFlow(false);
    setRenderFollower(true);
  }

  const handleMain = () => {
    setRenderMain(true);
    setRenderFollowing(false);
    setRenderMyFlow(false);
    setRenderFollower(false);
  }

  return(
    <SideBarWrapper>
        <SidebarButton onClick={() => moveLeft()}>
            <MenuImg/>
        </SidebarButton>
        <Sidebar translateX={translateX}>
            <CloseButton onClick={() => moveRight()}></CloseButton>
            
              {renderMain && <SideBarMain handleFollower = {handleFollower} handleFollowing = {handleFollowing} handleMyFlow = {handleMyFlow} handleMain = {handleMain} />}
              {renderFollower && <Follower />}
              {renderFollowing && <Following />}
              {renderMyFlow && <MyFlow />}
              <button className="button" onClick={handleMain}></button>
            
        </Sidebar>
      </SideBarWrapper>
  )

}

export default SideBar;