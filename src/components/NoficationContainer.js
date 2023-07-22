import React from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";

const NoficationDiv = styled.div`
  width: 95%;
  height: 100px;
  padding: 10px;
  text-align: center;
  border-bottom: ${props=>props.theme.borderColor};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  font-family: var(--kfont);

`;


const NoficationContainer = ({ diaryName, name, comment }) => {
  const [isComment, setIsComment] = useState(false);

  // useEffect로 마운트 되었을 때 현재 있는 알림들의 isView를 true 값으로 바꾸는 함수 필요
  // setIsComment를 true로 바꾸어주는 함수 필요


  return (
    <NoficationDiv>
      <div className="header">
        {diaryName}
      </div>
      <div className="body">
        {isComment === true ? <p>{name}님이 댓글을 남겼습니다. <br /> {comment} </p> : <p>{name}님이 좋아요를 남겼습니다.</p> }
      </div>

    </NoficationDiv>
  );
};

export default NoficationContainer;