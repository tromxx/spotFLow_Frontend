import React from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";

const NoficationDiv = styled.div`
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


const NoficationContainer = ({ time, diaryName, name, comment, liked }) => {
  const [isComment, setIsComment] = useState(false);

 


  return (
    <NoficationDiv>
      <div className="header">
        {diaryName}
      </div>
      <div className="body">
        {isComment === true ? <p>{name}님이 댓글을 남겼습니다.</p> : <p>{name}님이 좋아요를 남겼습니다.</p> }
      </div>

    </NoficationDiv>
  );
};

export default NoficationContainer;