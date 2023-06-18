import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Diary from './pages/Diary';
import MyFlow from './pages/MyFlow';
import TimeLine from './pages/TimeLine';
import HeaderBar from './components/HeaderBarNavi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
            <HeaderBar />
            <Home />
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
