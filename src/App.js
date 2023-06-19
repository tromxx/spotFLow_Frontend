import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import MyFlow from './pages/MyFlow';
import TimeLine from './pages/TimeLine';
import HeaderBarNavi from './components/HeaderBarNavi';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FollowingFollow from './pages/FollowingFollow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
            <HeaderBarNavi />
            <Home />
          </>} />
        <Route path="/login" element={<>
          <HeaderBarNavi />
          <Login />
        </>} />
        <Route path="/singup" element={<>
          <HeaderBarNavi />
          <Signup />
        </>} />
        <Route path="/followingfollow" element={<>
          <HeaderBarNavi />
          <FollowingFollow />
        </>} />
        <Route path="/diary" element={<Diary/>} />
        <Route path="/myflow" element={<MyFlow/>}/>   
        <Route path="/diary" element={<Diary/>} /> 
        <Route path="/timeline" element={<TimeLine/>} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;