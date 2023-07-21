import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/HeaderBarNavi';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { ThemeProvider } from './context/themeProvider';
import DiaryCategory from './pages/DiaryCategory';
import DiaryMypage from './pages/DiaryMypage';
import {DiarySwiper} from "./components/DiarySwiper";
import DiaryCreate from './pages/DiaryCreate';
import UserStore from './context/UserStore';
import MyFlow from './pages/MyFlow';
import MobileMyFlow from './pages/MobileMyFlow';
import FindPwEmail from './pages/FindPwEmail';
import { useLayoutEffect, useState } from 'react';
import Nofication from './pages/Nofication';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <UserStore>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<>
                <HeaderBarNavi />
                <Home/>
              </>} />
            <Route path="/login" element={<>
             
              <Login />
            </>} />
            <Route path="/signup" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <SignUp />
            </>} />
            <Route path="/findpwemail" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <FindPwEmail />
            </>} />
            <Route path="/diary" element={<>
              <HeaderBarNavi />
              <Diary />
            </>} />
            <Route path="/diaryCategory" element={<>
              <HeaderBarNavi />
              <DiaryCategory />
            </>} />
            <Route path="/diaryMypage" element={<>
              <HeaderBarNavi />
              <DiaryMypage />
            </>} />
            <Route path="/diaryCreate" element={<>
              <HeaderBarNavi />
              <DiaryCreate />
            </>} />
            <Route path="/flow" element={
              <>
                {windowWidth <= 840 ? null : <HeaderBarNavi />}
                <TimeLine />
              </>
            }/>
            <Route path="/diary/detail/:id" element={
              <>
                <HeaderBarNavi />
                <DiarySwiper/>
              </>
            }/>

            <Route path='/myflow' element={
            <>
            {windowWidth <= 840 ? null : <HeaderBarNavi />}
            {windowWidth <= 840 ? <MobileMyFlow /> :  <MyFlow />}
             
            </>
           }/>
           <Route path='/nofication' element={
            <>
            {windowWidth <= 840 ? null : <HeaderBarNavi />}
            <Nofication />
            </>
           }
           />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </UserStore> 
  );
}

export default App;
