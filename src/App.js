import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import MyFlow from './pages/MyFlow';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/HeaderBarNavi';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Follower from './pages/Follower';
import Following from './pages/Following';
import { ThemeProvider } from './context/themeProvider';
import styled from 'styled-components'
import MapView from './pages/MapView';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import Sidebars from './components/SideBar';

const Sidebar = styled.div`
  margin-top: 53px;
  width: 30vw;
  height: 93vh;
  min-width: 450px;
  position: absolute;
  z-index: 50;
  top: 0px;
  left: 0;
  background-color: white;
  border-right: 10px solid val(--grey);
  transition: transform 0.5s ease;
  transform: translateX(${({ translateX }) => translateX});
`;

const SidebarButton = styled(AiOutlineMenu)`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  top: 70px;
  left: 50px;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

`;

const ExitButton = styled(AiOutlineClose)`
  width: 30px;
  height: 30px;
  position: absolute;
  z-index: 2;
  top: 1vh;
  left: 25vw;
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

`;

function App() {
    const shouldRenderSidebar = (path) => {
    return path === "/" ;
    };
  const [translateX, setTranslateX] = useState("-50vw")

  const moveLeft = () => {
    setTranslateX("0");
  };

  const moveRight = () => {
    setTranslateX("-100vw");
  };


  return (
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<>
                <HeaderBarNavi />
              
                <>
                {shouldRenderSidebar(window.location.pathname) && <Sidebars/>}
                </>
                <MapView/>

              </>} />
            <Route path="/login" element={<>
              <HeaderBarNavi />
              <Login />
            </>} />
            <Route path="/signup" element={<>
              <HeaderBarNavi />
              <Signup />
            </>} />
            <Route path="/follower" element={<>
              <HeaderBarNavi />
              <SidebarButton onClick={moveLeft}>
              </SidebarButton>
              <Sidebar translateX={translateX}>
                <ExitButton onClick={moveRight}></ExitButton>
                <Follower/>
              </Sidebar>
            </>} />
            <Route path="/following" element={<>
              <HeaderBarNavi />
              <SidebarButton onClick={moveLeft}></SidebarButton>
              <Sidebar translateX={translateX}>
              <ExitButton onClick={moveRight}></ExitButton>
              <Following/>
              </Sidebar>
              <MapView/> 
            </>} />
            <Route path="/diary" element={<>
              <HeaderBarNavi />
              <Diary />
            </>} />
            <Route path="/myflow" element={<MyFlow />} />
            <Route path="/timeline" element={<TimeLine />} />
            
          </Routes>
          <MapView/>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
