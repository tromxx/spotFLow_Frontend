import React from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../components/Flowcss.css"

const MyFlowContainerDiv = styled.div`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${props => props.theme.textColor === 'black' ? '#d6d6d6' : '#423F3E'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  font-family: var(--efont);
`;

const TnLnContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 70%;
  height: 100%;
`;

const TimeandLocation = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start; /* 수정: 상단 정렬로 변경 */
  margin-top: -10px;
  width: 100%;
  height: 10px;
  font-family: var(--kfont);
  font-size: 13px;
  font-weight: bold;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  align-self: flex-end;
  position: absolute;
  right: 10px;
`;

const ContentText = styled.p`
  position: absolute;
  top: -5px;
  left: -7px;
  font-family: var(--kfont);
  font-size: 12px;
  padding: 5px;
  height: 100%;
  overflow: hidden;
  flex: 1;
`;

const Location = styled(SlLocationPin)`
  margin-left: 5px;
  margin-top: 4px;
  margin-right: 3px;
  width: 13px;
  height: 13px;
`;

const Date = styled.div`
  color: ${props => props.theme.textColor};
  width: 100px;
  height: 20px;
  font-family: var(--kfont);
  font-size: 13px;
  font-weight: bold;
  position: absolute;
  left: -10px;
`;

const DateWrapper = styled.div`
  position: relative;
  width: 101.5%;
  height: 20px;
  padding: 5px;
  margin-bottom: 3px;
  border-radius: 8px;
  background-color: ${props => props.theme.textColor === 'black' ? '#d6d6d6' : '#423F3E'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  font-family: var(--efont);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 100%;
`;

const FlowContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 80%;
  .checkBox {
    position: absolute;
    left: -30px;
    top: 80px;
    transition: 0.6s ease;
    opacity: 1;
  }
`;

const MyFlowContainer = ({ key, img, time, content, location, date, isVisible, id}) => {
  const [isChecked, setIsChecked] = useState(false);

 


  return (
    <FlowContainerWrapper>
      <CSSTransition in={isVisible} timeout={200} classNames="fade" unmountOnExit>
      <div>
        
          <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="checkBox"
          />
        
      
      </div>
      </CSSTransition>
      <FlowContainer>
        
        <DateWrapper>
            <Date>
              {date}
            </Date>
          </DateWrapper>
        <MyFlowContainerDiv>
          <TnLnContentDiv>
            <TimeandLocation>{time}  <Location />{location}</TimeandLocation>
            <ContentText>{content}</ContentText>
          </TnLnContentDiv>
          
          <Image src={img} alt="img" />

        </MyFlowContainerDiv>

      </FlowContainer>
    </FlowContainerWrapper>
  );
};

export default MyFlowContainer;
