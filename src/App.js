import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/Common/HeaderBarNavi';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import {ThemeProvider} from './context/themeProvider';
import DiaryCategory from './pages/DiaryCategory';
import DiaryMypage from './pages/DiaryMypage';
import {DiarySwiper} from "./components/DiaryDetail/DiarySwiper";
import DiaryCreate from './pages/DiaryCreate';
import UserStore from './context/UserStore';
import MyFlow from './pages/MyFlow';
import MobileMyFlow from './pages/MobileMyFlow';
import FindPwEmail from './pages/FindPwEmail';
import {useLayoutEffect, useState} from 'react';
import ChangeInfo from './pages/ChangeInfo';
import Notification from './pages/Notification';
import DirectMessenger from "./pages/DirectMessenger";

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
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <Home/>
            </>}/>
            <Route path="/login" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <Login/>
            </>}/>
            <Route path="/signup" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <SignUp/>
            </>}/>
            <Route path="/findpwemail" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <FindPwEmail/>
            </>}/>
            <Route path="/changeinfo" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <ChangeInfo/>
            </>}/>
            <Route path="/diary" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <Diary/>
            </>}/>
            <Route path="/diaryCategory" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <DiaryCategory/>
            </>}/>
            <Route path="/diaryMypage" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <DiaryMypage/>
            </>}/>
            <Route path="/diaryCreate" element={<>
              {windowWidth <= 840 ? null : <HeaderBarNavi/>}
              <DiaryCreate/>
            </>}/>
            <Route path="/flow" element={
              <>
                {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                <TimeLine/>
              </>
            }/>
            <Route path="/diary/detail/:id" element={
              <>
                {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                <DiarySwiper/>
              </>
            }/>

            <Route path='/myflow' element={
              <>
                {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                {windowWidth <= 840 ? <MobileMyFlow/> : <MyFlow/>}


              </>
            }/>
            <Route path='/notification' element={
              <>
                {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                <Notification/>
              </>
            }
            />
            <Route path='/ws-test' element={
              <>
                {windowWidth <= 840 ? null : <HeaderBarNavi/>}
                <DirectMessenger/>
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
