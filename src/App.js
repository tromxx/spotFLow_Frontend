import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import FollowingFollow from './pages/FollowingFollow';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/diary" element={<Diary/>} />      
        <Route path="/followingfollow" element={<FollowingFollow/>} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
