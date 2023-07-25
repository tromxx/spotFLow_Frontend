import {styled} from 'styled-components';
import MapView from "./MapView";
import {useContext, useEffect, useState} from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import SlideDiv from '../components/Home/SlideDiv'
import MyPage from '../components/Home/MyPage'
import CustomerApi from '../api/CustomerApi';
import { UserContext } from '../context/UserStore';
import Follow from '../components/Home/Follow';

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

<<<<<<< HEAD
=======
  const{setEmail, setNickname,setProfilePic,setStatMsg,setFollower, setFollowing ,setIsLoggedIn} = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(localStorage.getItem('authToken'));
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          console.log(response.data);
          setEmail(response.data.customer.email);
          setNickname(response.data.customer.nickName);
          setProfilePic(response.data.customer.profilePic);
          setStatMsg(response.data.customer.statMsg);
          setFollower(response.data.follower.follower);
          setFollowing(response.data.follower.following);
          setIsLoggedIn(true);
        } catch (error) {
          localStorage.clear();
        }
      }else{
        return null;
      }
    };
    getCustomerInfo();
  }, [setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn,setFollower, setFollowing]);
>>>>>>> 4fa9ee1635e660f9f47dfc1ab0926f6606110072

  const renderPage = () => {
    switch (currentPage) {
      case 'MyPage':
        return <MyPage  
          onClose={()=>setActivate(false) }
          setCurrentPage={()=>setCurrentPage('Follow')}
          />;
          case 'Follow' :
            return <Follow
            setCurrentPage={()=>setCurrentPage('MyPage')}
        />;
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