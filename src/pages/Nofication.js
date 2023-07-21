import React from "react";
import { styled } from "styled-components";

const NoficationWrapper = styled.div`
 	display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	background-color: ${props=>props.theme.bgColor};
	
`;

const NoficationDiv = styled.div`
  background-color: ${props=>props.theme.divColor};
  color: ${props=>props.theme.textColor};
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	width: 60%;
	margin-top: 40px;
  height: 93vh;
	min-height: 93vh;
  display: flex;
  align-items: center;
	text-align: center;
	flex-direction: column;
	position: relative;
`;

const Nofication = () => {

  return (
    <NoficationWrapper>
      <NoficationDiv>
        
      </NoficationDiv>
    </NoficationWrapper>
  );
}

export default Nofication;