/*
Follower page 
- 어떻한 사용자가 사용자의 follower 하고 있는지 확인 가능 
- Follower 하는 사용자의 삭제 도 가능 
*/

import React, {useState} from "react";
import {styled} from 'styled-components';
import SearchBar from "../components/SearchBar";
import FollowingFollowCounter from "../components/FollowingFollowCounter";
import FollowerContainer from "../components/FollowerContainer"

const FollowerDiv = styled.div`
  height: 85vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 60px;
  overflow: scroll;
`;



const Follower = () => {
  const [search, setSearch] = useState("");

  const handleUserInput = (input) => {
    setSearch(input);
    console.log("User input:", input);
  };

  return (
    <FollowerDiv>
        <FollowingFollowCounter follower={10} following={20} />
        <SearchBar onInputChange={handleUserInput}/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
        <FollowerContainer/>
    </FollowerDiv>
  );
};

export default Follower;