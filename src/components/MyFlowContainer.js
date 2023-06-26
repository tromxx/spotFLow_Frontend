import React from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";

const MyFlowContainerDiv = styled.div`
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 8px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  font-family: var(--efont);
`;

const TnLnContentDiv = styled.div`
  display: flex;
  flex-direction: column;
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
  display: flex;
  align-self: flex-start;
  font-family: var(--kfont);
  font-size: 12px;
  padding: 5px;
  width: 200px;
  height: 50px;
`;

const Location = styled(SlLocationPin)`
  margin-left: 5px;
  margin-top: 4px;
  margin-right: 3px;
  width: 13px;
  height: 13px;
`;

const MyFlowContainer = ({ img, time, content, location }) => {
  return (
    <MyFlowContainerDiv>
      <TnLnContentDiv>
        <TimeandLocation>{time}  <Location />{location}</TimeandLocation>
        <ContentText>{content}</ContentText>
      </TnLnContentDiv>
      
      <Image src={img} alt="img" />
      
    </MyFlowContainerDiv>
  );
};

export default MyFlowContainer;
