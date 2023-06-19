import React, { useRef, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import { AiOutlineMenu } from 'react-icons/ai';
import { styled } from "styled-components";
import { CSSTransition } from 'react-transition-group';

const FollowFollowingDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;
`;

const MenuIcon = styled(AiOutlineMenu)`
  font-size: 3rem;
  position: absolute;
  z-index: 2;
  top: 2vh;
  left: 3vw;
`;

const AlertContainer = styled.div`
    width: 600px;
    height: 100vh;
    background-color: grey;
    position: absolute;
    z-index: 2;
`;

const FollowingFollow = () => {
  const [showButton, setShowButton] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const nodeRef = useRef(null);

  return (
    <FollowFollowingDiv>
      <KakaoMap/>
      {showButton && (
        <button onClick={() => setShowInfo(true)}>
          <MenuIcon/>
        </button>
      )}
      <CSSTransition
        in={showInfo}
        nodeRef={nodeRef}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <AlertContainer ref={nodeRef}>
          <h1>Testing</h1>
          <button onClick={()=>setShowInfo(false)}><h1>Exit</h1></button>
        </AlertContainer>
      </CSSTransition>
    </FollowFollowingDiv>
  );
};

export default FollowingFollow;
