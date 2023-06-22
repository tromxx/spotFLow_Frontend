import {styled} from 'styled-components';
import MapView from "./MapView";

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

  return (
    <HomeDiv>
      <MapView/>
    </HomeDiv>
  );
};

export default Home;