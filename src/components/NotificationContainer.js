import React, { useEffect } from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";

const NotificationDiv = styled.div`
  width: 95%;
  height: 100px;
  margin-top: 10px;
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


const NotificationContainer = ({ diary, name, comment }) => {

  
 
  const maxLength = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str;
    } else {
      // maxLength보다 길면 maxLength 길이로 자르고 말줄임표를 붙여서 반환
      return str.slice(0, maxLength) + "...";
    }
  }

  useEffect(()=>{
    console.log(diary)
  },[])
  

  return (
    <NotificationDiv>
        {comment !== "" ? 
          <p> 
            {/* <CommentImg /> <br /> {maxLength(name,25)}님이 {maxLength(diary,25)} 에 댓글을 남겼습니다. <br /> {maxLength(comment,25)} */}
            <CommentImg /> <br /> {name}님이 {diary} 에 댓글을 남겼습니다. <br /> {comment}
          </p> 
            : 
          <p>
            {/* <HeartImg /> <br />  {maxLength(diary,25)} 에 좋아요를 받았습니다. */}
            <HeartImg /> <br />  {diary} 에 좋아요를 받았습니다.
          </p> 
        }

    </NotificationDiv>
  );
};

export default NotificationContainer;