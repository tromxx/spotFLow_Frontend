import {styled} from 'styled-components';


const MyFlowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	top: 7vh;   
	width: 80%;
	height: 100%;
`;


const Follower = () => {
  return (
    <MyFlowDiv>
      <p>This is Follwer page</p>
    </MyFlowDiv>
  );
};

export default Follower;