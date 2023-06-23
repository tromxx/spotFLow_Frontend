import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import FollowerContainer from "./FollowerContainer";
import FollowingContainer from "./FollowingContainer";
// import FollowDummyData from "../dataSet/FollowDummyData";


const FollowerFollowingCounter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-family: var(--efont);
  margin-bottom: 30px;
  p:hover{
    color: var(--blue);
  }
`;

const FollowerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border  : 1px solid black;
  overflow-y: scroll;
`;


const BiArrowBacks = styled(BiArrowBack)`
  margin-left: 30px;
  color: var(--grey);
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const Follower = ({handleMain, handleFollower, handleFollowing, follower, following}) => {

  return (
    <>
      <h1 onClick={handleMain}>
        <BiArrowBacks /> 
      </h1>
      <FollowerFollowingCounter>
      <p onClick={handleFollower}>follower : {follower}</p>
      <p onClick={handleFollowing}>following : {following}</p>
      </FollowerFollowingCounter>
      <FollowerDiv>
        <p>follower 페이지</p>
        <p>follower 페이지</p>
      
      </FollowerDiv>
    </>
  );
};

export default Follower;


// to much rendering for some reason 
// 1. divide the following and follow page
// 2. use the dummy data to set the value