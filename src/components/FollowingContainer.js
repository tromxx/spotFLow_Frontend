import React, { useState } from "react";
import styled, { keyframes} from "styled-components"


const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  10% {
    opacity: 0.9;
  }

  20% {
    opacity: 0.8;
  }

  30% {
    opacity: 0.7;
  }

  40% {
    opacity: 0.6;
  }

  50% {
    opacity: 0.5;
  }

  60% {
    opacity: 0.4;
  }

  70% {
    opacity: 0.3;
  }

  80% {
    opacity: 0.2;
  }

  90% {
    opacity: 0.1;
  }

  100% {
    opacity: 0;
  }
`;

const FollowerContainerDiv = styled.div`
    width: 400px; //반응형시 수정 필요
    height: auto;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid var(--grey);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    font-family: var(--efont);
    opacity: ${({ fade }) => (fade ? 0 : 1)};
  transition: opacity 1s ease-out;
`;
 
const UnfollowButton = styled.button`
    font-family: var(--efont);
    border-radius: 20px;
    background-color: var(--lightblue);
`;
    
const FollowingContainer = ({img, nickname, unfollow}) =>{
  const [fade, setFade] = useState(false);

  const handleUnfollow = () => {
    setFade(true);
    setTimeout(() => {
      unfollow(nickname);
    }, 1000); // Wait for the transition to complete before removing the person
  };
    return(
        <FollowerContainerDiv fade={fade}>
            <img src={img} alt="error" />
            <p>{nickname}</p>
            <UnfollowButton onClick={handleUnfollow}>Unfollow</UnfollowButton>
        </FollowerContainerDiv>
    );
}

export default FollowingContainer