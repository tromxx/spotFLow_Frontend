import {styled} from 'styled-components';
import MapView from "./MapView";
import {useEffect, useState} from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import MyFlow from './MyFlow'
import SlideDiv from '../components/Home/SlideDiv'
import MyPage from '../components/Home/MyPage'
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserStore';
import CustomerApi from '../api/CustomerApi';

const MenuButton = styled(AiOutlineMenu)`
  z-index: 2;
  position: absolute;
  top: 8.5%;
  left: 5%;
  width: 40px;
  height: 40px;
  @media (max-width : 844px) {
    width: 30px;
    height: 30px;
    top: 8%;
    left: 10%;
  }
`;


const Home = () => {
  const [active, setActivate] = useState(false);
  const [currentPage, setCurrentPage] = useState('MyPage');
  const{setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn} = useContext(UserContext)

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token != null) {
      const getCustomerInfo = async () => {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.email);
          setNickname(response.data.nickName);
          setProfilePic(response.data.profilePic);
          setStatMsg(response.data.statMsg);
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false);
          localStorage.clear();
        }
      };
      getCustomerInfo();
    }
  }, [setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn]);

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
        return null;
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