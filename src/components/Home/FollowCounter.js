import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";
import {styled} from 'styled-components';

const FollowerCounterDiv=styled.div`
    display: flex;
    gap: 50px;
    label{
        width: 60px;
        height: 34px;
        position: relative;

    }
    input{
        opacity: 0;
        width: 0;
        height: 0;
    }
    span{
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: grey;
    }
    span:before{
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
    }
`;

const FollowCounter = () => {
    const{follower, following} = useContext(UserContext);
    return(
        <FollowerCounterDiv>
  
            <label>
                <input type="checkbox" />
                <p>follower : {follower}</p>
                <p>following : {following}</p>
                <span/>
            </label>
        </FollowerCounterDiv>
    );
};

export default FollowCounter;