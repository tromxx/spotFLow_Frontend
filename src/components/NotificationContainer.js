import React, { useEffect } from "react";
import { styled } from 'styled-components'
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";

const NotificationDiv = styled.div`
  width: 95%;
  height: 100px;
  margin-top: 5px;
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
    height: 150px;
    margin-bottom: 20px;
  }
.name-container,
.diary-container,
.comment-container {
  max-width: 100px; /* 텍스트 최대 너비 설정 */
  overflow: hidden;
  white-space: nowrap; /* 텍스트가 한 줄에서만 표시되도록 설정 */
  text-overflow: ellipsis; /* 텍스트가 너무 길 경우 ...으로 표시 */
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

  
 
  

  useEffect(()=>{
    console.log(diary)
  },[])
  

  return (
    <NotificationDiv>
        {comment !== "" ? 
          <p>
            <CommentImg /> <br /> <span className="name-container">{name}</span>님이 <span className="diary-container">{diary}</span> 에 댓글을 남겼습니다. <br /> <span className="comment-container">{comment}</span>
          </p>
            : 
          <p>
            <HeartImg /> <br />  <span className="diary-container">{diary}</span> 에 좋아요를 받았습니다.
          </p> 
        }

    </NotificationDiv>
  );
};

export default NotificationContainer;