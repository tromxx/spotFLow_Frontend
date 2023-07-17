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
`;

const TimeandLocation = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start; /* 수정: 상단 정렬로 변경 */
  margin-top: -10px;
  width: 200px;
  height: 10px;
  font-family: var(--kfont);
  font-size: 13px;
  font-weight: bold;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  align-self: flex-end;
`;

const ContentText = styled.p`
  position: absolute;
  top: -5px;
  left: -7px;
  font-family: var(--kfont);
  font-size: 12px;
  padding: 5px;
  width: 215px;
  height: 50px;
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
  width: 103.5%;
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
  z-index: 999;
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const FlowContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  .checkBox {
    position: absolute;
    left: -30px;
    top: 80px;
    transition: 0.6s ease;
    opacity: 1;
  }
`;

const MyFlowContainer = ({ key, img, time, content, location, date, isVisible, id, onClick }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    onClick(id);
  };


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
      <FlowContainer onClick={handleClick}>
        
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
