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
            <Route path="/timeline" element={<TimeLine />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
