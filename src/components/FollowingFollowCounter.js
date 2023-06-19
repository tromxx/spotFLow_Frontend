import React from "react";
import styled from 'styled-components'

const FollowingFollowCounterDiv = styled.div`
    display: flex;
    gap: 50px;
    p{
        font-family: var(--efont);
        font-size: 20px;
        font-weight: bold;
    }
`;

const FollowingFollowCounter = ({follow, following}) =>{
    return(
        <FollowingFollowCounterDiv>
            <p>Follow : {follow}</p>
            <p>Following : {following}</p>
        </FollowingFollowCounterDiv>
    );
};

export default FollowingFollowCounter;