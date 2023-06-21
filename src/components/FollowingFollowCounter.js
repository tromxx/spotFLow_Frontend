/*
Follow 수랑 Following 할수 있는 컴포넌트 
- Props 로 Follow 수랑 Following 수 전달 필요
*/

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const FollowingFollowCounterDiv = styled.div`
    display: flex;
    gap: 50px;
    margin-top: 100px;
    cursor: pointer;
    p{
        font-family: var(--efont);
        font-size: 16px;
    }
    p:hover{
        color: var(--blue);
    }
`;

const FollowingFollowCounter = ({follower, following}) =>{
    const navigate = useNavigate()
    
    const goToFollower = () =>{
        navigate("/follower")
    }

    const goToFollowing = () =>{
        navigate("/following")
    }

    return(
        <FollowingFollowCounterDiv>
            <p onClick={goToFollower}>Follower : {follower}</p>
            <p onClick={goToFollowing}>Following : {following}</p>
        </FollowingFollowCounterDiv>
    );
};

export default FollowingFollowCounter;