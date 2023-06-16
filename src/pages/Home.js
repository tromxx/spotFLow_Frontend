import React from "react";
import {styled} from 'styled-components';
import HeaderBar from "../components/HeaderBarNavi";
import KakaoMap from "../components/KakaoMap";

const HomeDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;

  * {
    box-sizing: border-box;
  }

  .to-timeline {
    width: 5vw;
    height: 2vw;
    top: 300px;
    left: 300px;
    position: absolute;
    background-color: #00b4d8;
    color: white;
    z-index: 2;
    text-align: center;
    padding: 10px 0;
  }
`;

const Home = () => {
  return (
    <HomeDiv>
      <HeaderBar/>
      <KakaoMap/>
      <div className="hot-place to-timeline">강남구</div>
    </HomeDiv>
  );
};

export default Home;