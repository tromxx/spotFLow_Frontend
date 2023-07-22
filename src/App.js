import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/Common/HeaderBarNavi';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { ThemeProvider } from './context/themeProvider';
import DiaryCategory from './pages/DiaryCategory';
import DiaryMypage from './pages/DiaryMypage';
import {DiarySwiper} from "./components/DiarySwiper";
import DiaryCreate from './pages/DiaryCreate';
import UserStore from './context/UserStore';
import MyFlow from './pages/MyFlow';
import FindPwEmail from './pages/FindPwEmail';
import { useLayoutEffect, useState } from 'react';
import ChangeInfo from './pages/ChangeInfo';

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
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
                <Home/>
              </>} />
            <Route path="/login" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
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
            <Route path="/changeinfo" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi />}
              <ChangeInfo />
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
            <Route path="/timeline" element={<TimeLine />} />
            <Route path="/diary/detail/:id" element={
              <>
                <HeaderBarNavi/>
                <DiarySwiper/>
              </>
            }/>

            <Route path='/myflow' element={
            <>
            <HeaderBarNavi/>
             <MyFlow />
            </>
           }/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </UserStore> 
  );
}

export default App;
