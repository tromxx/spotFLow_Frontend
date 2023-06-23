import React from "react";
import { styled } from "styled-components";
import { BiArrowBack } from "react-icons/bi";
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

const FollowingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border  : 1px solid black;
  height: 50vh;
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

const Following = ({handleMain, handleFollower, handleFollowing, follower, following}) => {
  return (
    <>
      <h1 onClick={handleMain}>
        <BiArrowBacks /> 
      </h1>
      <FollowerFollowingCounter>
        <p onClick={handleFollower}>follower : {follower}</p>
        <p onClick={handleFollowing}>following : {following}</p>
      </FollowerFollowingCounter>
      <FollowingDiv>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
        <p>following 페이지</p>
      </FollowingDiv>
    </>
  );
};

export default Following;