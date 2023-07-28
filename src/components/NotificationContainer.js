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

  .container {
  font-weight: bolder;
  width:70px;
  padding:0 5px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

  @media(max-width: 768px) {
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
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


const NotificationContainer = ({ diary, sender, comment }) => {

  
 
  

  useEffect(()=>{
    console.log(diary)
  },[])
  

  return (
    <NotificationDiv>
        {comment !== "" ? 
          <p>
            <CommentImg /> <br /> <span className="container">{sender}</span>님이 <span className="container">{diary}</span> 에 댓글을 남겼습니다. <br /> <span className="container">{comment}</span>
          </p>
            : 
          <p>
            <HeartImg /> <br />  <span className="container">{diary}</span> 에 좋아요를 받았습니다.
          </p> 
        }

    </NotificationDiv>
  );
};

export default NotificationContainer;