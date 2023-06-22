import {styled} from 'styled-components';
import MapView from "./MapView";
import SideBarMain from "../components/SidebarMain";
import SideBar from "../components/SideBar";

const HomeDiv = styled.div`
  width: auto;
  height: auto;
  position: relative;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  border: ${props => props.theme.borderColor};

  z-index: 1;

  * {
    box-sizing: border-box;
  }

`;


const Home = ({children}) => {

  const navigate = useNavigate();


  return (
    <HomeDiv>
      <SideBar/>
    </HomeDiv>
  );
};

export default Home;