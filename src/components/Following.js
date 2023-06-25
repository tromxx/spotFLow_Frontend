import React from "react";
import { styled } from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import FollowingContainer from "./FollowingContainer";
import { useState } from "react";
import FollowerDummyData from "../dataSet/FollowerDummyData"
import SearchBar from "../components/SearchBar"


const FollowerFollowingCounter = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-evenly; 
  align-items: center;
  font-family: var(--efont);
  margin-bottom: 30px;
  p:hover {
    color: var(--blue);
  }
`;


const FollowingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  gap: 30px;
  height: auto; 
  max-height: 70vh; 
  overflow-y: auto; 
`;

const BiArrowBacks = styled(BiArrowBack)`
  margin-left: 30px;
  color: var(--grey);
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 45px auto 45px;

`

const Following = ({handleMain, handleFollower, handleFollowing, follower, following}) => {
  const [followings, setFollowings] = useState(FollowerDummyData);
  console.log(FollowerDummyData)
  return (
    <>
      <h1 onClick={handleMain}>
        <BiArrowBacks /> 
      </h1>
      <FollowerFollowingCounter>
        <p onClick={handleFollower}>follower : {follower}</p>
        <p onClick={handleFollowing}>following : {following}</p>
      </FollowerFollowingCounter>
      <SearchDiv>
      <SearchBar/>
      </SearchDiv>
      <FollowingDiv>
      {followings.map((item) => (
        <FollowingContainer img={item.src} nickname={item.nickName} key={item.id} />
      ))}
      </FollowingDiv>
    </>
  );
};

export default Following;