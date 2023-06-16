import React from "react";
import { styled } from 'styled-components';
import HeaderBar from "../components/HeaderBarNavi";
import KakaoMap from "../components/KakaoMap";

const HomeDiv = styled.div`
    width: auto;
    height: auto;
`;

const Home = () =>{
    return(
        <HomeDiv>        
            <HeaderBar/>
            <KakaoMap/>
        </HomeDiv>
    );
};

export default Home;