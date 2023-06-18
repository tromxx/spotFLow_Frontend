import React, { useRef } from "react";
import HeaderBar from "../components/HeaderBarNavi";
import KakaoMap from "../components/KakaoMap";
import { styled } from "styled-components";
import { CSSTransition } from 'react-transition-group';

const FollowFollowingDiv = styled.div`  
    width: auto;
    height: auto;
    .Testing{
        position: absolute;
        top: 79px;
        width: 30vw;
        height: 1200px;
        z-index: 2;
        background-color: grey;
    }
`;

const FollowingFollow = () =>{
    const nodeRef = useRef(null);
    return(
        <FollowFollowingDiv>
            <HeaderBar/>
            <KakaoMap/>
                <div className="Testing" ref={nodeRef}></div>
        </FollowFollowingDiv>
    );
}

export default FollowingFollow;