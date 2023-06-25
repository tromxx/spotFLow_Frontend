import React from "react";
import styled from "styled-components"

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
`;
 
const UnfollowButton = styled.button`
    font-family: var(--efont);
    border-radius: 20px;
    background-color: var(--lightblue);
`;
    
const FollowingContainer = ({img, nickname}) =>{
    return(
        <FollowerContainerDiv>
            <img src={img} alt="error" />
            <p>{nickname}</p>
            <UnfollowButton>Unfollow</UnfollowButton>
        </FollowerContainerDiv>
    );
}

export default FollowingContainer