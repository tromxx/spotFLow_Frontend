import {styled} from 'styled-components';
import MapView from "./MapView";
import {useCallback, useState} from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import MyFlow from '../components/MyFlow'
import SlideDiv from '../components/SlideDiv'
import MyPage from '../components/MyPage'
import Following from '../components/Following'

const MenuButton = styled(AiOutlineMenu)`
  z-index: 2;
  position: absolute;
  top: 8vh;
  left: 30px;
  width: 40px;
  height: 40px;
`;


const Home = () => {
  const [active, setActivate] = useState(false);
  const [currentPage, setCurrentPage] = useState('MyPage');

  console.log(active)
  const renderPage = () => {
    switch (currentPage) {
      case 'MyPage':
        return <MyPage  
          goToMyFlow={()=>setCurrentPage('MyFlow')} 
          onClose={()=>setActivate(false)}/>;
        case 'MyFlow':
          return <MyFlow 
            goToMyPage={()=>setCurrentPage('MyPage')} 
            onClose={()=>setActivate(false)} />;
      case 'Following' :
        return <Following/>;
      default:
        return null;
    }
  };

  return (
    <>
      <MenuButton onClick={()=>setActivate(true)} />
      <SlideDiv show={active}>
        {renderPage()}
      </SlideDiv>
      <MapView/>
    </>
  );
};

export default Home;