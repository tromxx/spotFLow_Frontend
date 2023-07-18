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
import FindPwEmail from './pages/FindPwEmail';

function App() {


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
              <HeaderBarNavi />
              <SignUp />
            </>} />
            <Route path="/findpwemail" element={<>
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
