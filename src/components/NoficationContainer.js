import React from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";

const NoficationDiv = styled.div`
  width: 95%;
  height: 100px;
  margin-bottom: 10px;
  text-align: left;
  border-bottom: ${props=>props.theme.borderColor};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start; /* 수정: 상단 정렬로 변경 */
  font-family: var(--kfont);

  @media(max-width: 768px) {
    width: 100%;
    height: 100px;
  }
`;

const HeartImg = styled(AiFillHeart)`
  width: 25px;
  height: 25px;
`;

const CommentImg = styled(AiOutlineComment)`
  width: 25px;
  height: 25px;
  
`;


const NoficationContainer = ({ diaryTitle, name, comment }) => {

  // useEffect로 마운트 되었을 때 현재 있는 알림들의 isView를 true 값으로 바꾸는 함수 필요
 
  const commentMaxLength = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      // maxLength보다 길면 maxLength 길이로 자르고 말줄임표를 붙여서 반환
      return str.slice(0, maxLength) + "...";
    }
  }
  

  return (
    <NoficationDiv>
        {comment !== "" ? 
          <p> 
            <CommentImg /> <br /> {name}님이 {diaryTitle} 에 댓글을 남겼습니다. <br /> {commentMaxLength(comment,25)} 
          </p> 
            : 
          <p>
            <HeartImg /> <br />  {name}님이 {diaryTitle} 에 좋아요를 남겼습니다.
          </p> 
        }

    </NoficationDiv>
  );
};

export default NoficationContainer;