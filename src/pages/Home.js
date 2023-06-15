import React from "react";
import HeaderBar from "../components/HeaderBar";
import { styled } from 'styled-components';

const HomeDiv = styled.div`
    width: 97vw;
    height: auto;
`;

const Home = () =>{
    return(
        <HomeDiv>        
            <HeaderBar/>
            <h1>This is Home</h1>
        </HomeDiv>
    );
};

export default Home;