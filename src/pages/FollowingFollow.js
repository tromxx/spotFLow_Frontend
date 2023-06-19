import React, {useState} from "react";
import {styled} from 'styled-components';
import KakaoMap from "../components/KakaoMap";
import { AiOutlineMenu } from 'react-icons/ai';
import SearchBar from "../components/SearchBar";
import FollowingFollowCounter from "../components/FollowingFollowCounter";
import UserContainer from "../components/UserContainer";
const FollowingFollowDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;
`;

const SidebarButton = styled(AiOutlineMenu)`
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

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 30vw;
  height: 100%;
  min-width: 450px;
  min-height: max-content;
  position: absolute;
  z-index: 50;
  top: 0px;
  left: 0;
  background-color: white;
  border-right: 1px solid val(--grey);
  transition: transform 0.5s ease;
  transform: translateX(${({ translateX }) => translateX});
`;

const FollowingFollow = () => {
  const [translateX, setTranslateX] = useState("-50vw");

  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-150vw");
  };
  

  return (
    <FollowingFollowDiv>
      <KakaoMap/>
      <SidebarButton onClick={moveLeft}>
        <AiOutlineMenu/>
      </SidebarButton>
      <Sidebar translateX={translateX}>
        <FollowingFollowCounter follow={10} following={20} />
        <SearchBar/>
        <UserContainer/>
        <UserContainer/>
        <UserContainer/>
        <UserContainer/>
        <UserContainer/>
        <UserContainer/>
        <UserContainer/>
      </Sidebar>
    </FollowingFollowDiv>
  );
};

export default FollowingFollow;
