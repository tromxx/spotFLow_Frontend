import React, {useState} from "react";
import styled from 'styled-components';
import {SlMenu} from "react-icons/sl";
import {AiOutlineClose} from "react-icons/ai";
import close from "../images/close.png"
import SideBarMain from "./SidebarMain";
import Follower from "./Follower";
import Following from "./Following";
import MyFlow from "./MyFlow"
import { CSSTransition } from 'react-transition-group';


const SidebarButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 10vh;
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
  margin-top: 7vh;
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 93vh;
  min-width: 450px;
  max-width: 450px;
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

const CloseButton = styled.h1`
position: absolute;
top: 0px;
right: 0px;
  color: var(--grey);
  margin-right: 30px;
  &:hover {
    cursor: pointer;
    color: var(--blue);
  }
`;



const SideBar = () => {
  // 사이드바 가로이동
  const [translateX, setTranslateX] = useState("-100vw");
  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-100vw");
  };

  const [renderMain, setRenderMain] = useState(true);
  const [renderFollower, setRenderFollower] = useState(false);
  const [renderFollowing, setRenderFolloweing] = useState(false);
  const [renderMyFlow, setRenderMyFlow] = useState(false);

  const handleMyFlow = () => {
    setRenderMain(false);
    setRenderFollower(false);
    setRenderFolloweing(false);
    setRenderMyFlow(true);
  }

  const handleFollower = () => {
    setRenderMain(false);
    setRenderFollower(true);
    setRenderFolloweing(false);
    setRenderMyFlow(false);
  }

  const handleFolloweing = () => {
    setRenderMain(false);
    setRenderFollower(false);
    setRenderFolloweing(true);
    setRenderMyFlow(false);
  }


  const handleMain = () => {
    setRenderMain(true);
    setRenderFollower(false);
    setRenderFolloweing(false);
    setRenderMyFlow(false);
  }
  const [follower,setFollower] = useState(0);
  const [following,setFollowing] = useState(0);

  return(
    <>
      <SidebarButton onClick={() => moveLeft()}>
          <MenuImg/>
      </SidebarButton>
      <Sidebar translateX={translateX}>
          <CloseButton onClick={() => moveRight()}>
            <AiOutlineClose/>
          </CloseButton>
            {renderMain && <SideBarMain 
              handleMyFlow = {handleMyFlow}
              handleFollower = {handleFollower} 
              handleFollowing = {handleFolloweing} 
              handleMain = {handleMain} 
              follower = {follower} 
              following = {following}/>
            }
            {renderMyFlow && <MyFlow 
              handleMain={handleMain}/>
            }
            {renderFollower && <Follower 
              handleMain={handleMain} 
              handleFollower = {handleFollower} 
              handleFollowing = {handleFolloweing} 
              follower={follower} 
              following={following}/>
            }
            {renderFollowing && <Following
              handleMain={handleMain} 
              handleFollower ={handleFollower} 
              follower={follower} 
              following={following}/>
            }
      </Sidebar>
      </>
  );
};

export default SideBar;