import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import FollowerContainer from "./FollowerContainer";
import FollowingContainer from "./FollowingContainer";
import FollowDummyData from "../dataSet/FollowDummyData";

const FollowerFollowingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BiArrowBacks = styled(BiArrowBack)`
  margin-top: 47px;
  margin-left: 10px;
  color: var(--grey);
  cursor: pointer;
  &:hover {
    color: var(--blue);
  }
`;

const FollowerFollowing = ({ handleMain }) => {
  const [followerFollowing, setFollowerFollowing] = useState(""); // State for follower or following

  useEffect(() => {
    const storedFollower = localStorage.getItem("follower");
    const storedFollowing = localStorage.getItem("following");

    if (storedFollower) {
      setFollowerFollowing(storedFollower);
    } else  {
      setFollowerFollowing(storedFollowing);
    }
  }, []);



  return (
    <>
      <h1 onClick={handleMain}>
        <BiArrowBacks />
      </h1>
      {console.log(followerFollowing)}
      <FollowerFollowingDiv>
        <p>팔로잉팔로워 페이지</p>
       
        {followerFollowing === "Follower" ? <FollowerContainer /> : <FollowingContainer />}
      </FollowerFollowingDiv>
    </>
  );
};

export default FollowerFollowing;
