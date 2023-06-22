import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import MyFlow from './pages/MyFlow';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/HeaderBarNavi';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeProvider } from './context/themeProvider';
import DiaryCategory from './pages/DiaryCategory';
<<<<<<< HEAD

function App() {
=======


function App() {


>>>>>>> 4f2cf2804176faeb7e574dbacbe43d3bb0ed0bec

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
              <Diary/>
            </>} />

            <Route path="/diary/Category" element={<>
              <HeaderBarNavi />
              <DiaryCategory/>
            </>} />
            <Route path="/myflow" element={<MyFlow />} />
            <Route path="/timeline" element={<TimeLine />} />
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
