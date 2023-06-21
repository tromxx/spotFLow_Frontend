/*
Follower page 
- 어떻한 사용자가 사용자의 follower 하고 있는지 확인 가능 
- Follower 하는 사용자의 삭제 도 가능 
*/

import React, {useState} from "react";
import {styled} from 'styled-components';
import KakaoMap from "../components/KakaoMap";
import { AiOutlineMenu } from 'react-icons/ai';
import SearchBar from "../components/SearchBar";
import FollowingFollowCounter from "../components/FollowingFollowCounter";
import UserContainer from "../components/UserContainer";
const FollowingFollowDiv = styled.div`
  margin-top: 40px;
  width: 30vw;
  height: 100vw;
  position: relative;
  border: 1px solid black;
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
  align-items: center;
  gap: 30px;
  width: 30vw;
  height: 100%;
  min-width: 450px;
  position: absolute;
  top: 0px;
  left: 0;
  background-color: white;
  border-right: 10px solid val(--grey);
  transition: transform 0.5s ease;
  transform: translateX(${({ translateX }) => translateX});
`;

const Follower = () => {
  const [translateX, setTranslateX] = useState("-50vw");
  const [search, setSearch] = useState("");
  const moveLeft = () => {
    setTranslateX("0");
  };

  const handleUserInput = (input) => {
    setSearch(input);
    console.log("User input:", input);
  };

  return (
    <FollowingFollowDiv>
      <div>
        <FollowingFollowCounter follower={10} following={20} />
        <SearchBar onInputChange={handleUserInput}/>
        <p>This if Follower page</p>
        <p>{search}</p>
      </div>
    </FollowingFollowDiv>
  );
};

export default Follower;