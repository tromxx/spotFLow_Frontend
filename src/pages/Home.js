import {styled} from 'styled-components';
import SideBar from "../components/SideBar";
import MapView from "./MapView";
import ConvertBtn, {viewMode} from "../components/ConvertBtn";
import {useEffect} from "react";

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
  let mapData = {}
  useEffect(() => {
  },[localStorage.getItem("lat")])

  return (
    <HomeDiv>
      <SideBar/>
      <MapView/>
    </HomeDiv>
  );
};

export default Home;