import React from "react";
import { styled } from 'styled-components';
import HeaderBar from "../components/HeaderBarNavi";
import KakaoMap from "../components/KakaoMap";
import { SlMenu } from "react-icons/sl";
import { Link } from "react-router-dom";
const HomeDiv = styled.div`
    width: 100vw;
    height: 100vh;
    

    .SidebarButton {
        width: 35px;
        height: 35px;
        margin-top: 200px;
        margin-left: 200px;
        border: transparent;
        background-color: transparent;
        z-index: 999;
    }
    .SidebarButton:hover {
        cursor: pointer;
    }
`;

const MapWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 0;
    
`;


const SidebarIcon = styled(SlMenu)`
  width: 30px;
  height: 30px;
  margin-left: -5px;
`;

const SideBar = styled.div`
    width: 20vw;
    height: 100%;
    background-color: black;
`;



const Home = () =>{

    const sidebarOpen = () => {
        
    }


    return(
        <HomeDiv>        
            <HeaderBar/>
                <button className="SidebarButton" onClick={sidebarOpen}><SidebarIcon/></button>
            <MapWrapper>
                <KakaoMap/>
            </MapWrapper>
            
        </HomeDiv>
    );
};

export default Home;