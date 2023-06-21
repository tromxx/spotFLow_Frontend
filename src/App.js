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
import KakaoMap from './components/KakaoMap';
import styled from 'styled-components'
import SideBar from './components/SideBar';
import SideBarMain from './components/SidebarMain';

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 30vw;
  height: 100%;
  min-width: 450px;
  position: absolute;
  top: 0px;
  left: 0;
  background-color: white;
  border-right: 10px solid val(--grey);
  transition: transform 0.5s ease;
  transform: translateX(${({ translateX }) => translateX});
`;

function App() {
  return (
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<>
                <HeaderBarNavi />
                
                <SideBar>
                  <SideBarMain />
                </SideBar>
                <Home />
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
              <Sidebar>
              <Follower/>
              </Sidebar>
            </>} />
            <Route path="/following" element={<>
              <HeaderBarNavi />
              <Following/>
            </>} />
            <Route path="/diary" element={<>
              <HeaderBarNavi />
              <Diary />
            </>} />
            <Route path="/myflow" element={<MyFlow />} />
            <Route path="/timeline" element={<TimeLine />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
