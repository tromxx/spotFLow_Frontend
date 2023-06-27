import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/HeaderBarNavi';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeProvider } from './context/themeProvider';
import { useState } from 'react';
import DiaryCategory from './pages/DiaryCategory';
import DiaryMypage from './pages/DiaryMypage';
import AppCopy from "./App copy";



function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<>
                <HeaderBarNavi />
                <Home/>
              </>} />
            <Route path="/login" element={<>
              <HeaderBarNavi />
              <Login />
            </>} />
            <Route path="/signup" element={<>
              <HeaderBarNavi />
              <Signup />
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
            <Route path="/timeline" element={<TimeLine />} />
            <Route path="/test" element={<AppCopy/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
