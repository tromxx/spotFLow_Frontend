import {styled} from "styled-components";
import {Swiper, SwiperSlide} from "swiper/react";
import {useMemo, useState} from "react";
import {BsChatDots} from "react-icons/bs";

export const DiarySwipe = styled(Swiper)`
  width: 70vw;
  height: 90vh;
  background-color: white;
  display: flex;
  border-radius: 15px;
`;
export const TimeLine = styled(SwiperSlide)`
  width: 70vw;
  height: 90vh;
  background-color: #ccc;
  padding: 20px;
`;
export const Container = styled.div`
  width: 100vw;
  height: 93vh;
  display: flex;
  flex-direction: column;
  /* background-color: gray; */
  position: relative;
  top: 7vh;
  background-color: black;
  justify-content: center;

  * {
    box-sizing: border-box;
  }
`;
export const Btn = styled.button`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: 3px solid #d9d9d9;
  background-color: #61dafb;
  z-index: 3;

  .comment {
    font-size: 30px;
    color: white;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    bottom: 20px;
    right: 10px;
  }
`;
export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 30%);
  position: absolute;
  z-index: 2;
  color: white;
  padding: 50px;
  font-size: 3vh;
`
export const DiaryBox = styled.div`
  width: 100%;
  height: 50%;
`
export const TimeLineBox = styled.div`
  width: 100%;
  height: 50%;
`
const CommentBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 85%;
  width: 500px;
  background-color: white;
  z-index: 3;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 3px 7px 30px 7px rgb(20, 20, 20, 30%);

  * {
    box-sizing: border-box;
  }

  .input {
    width: 100%;
    height: 50px;
    background-color: rgb(20, 20, 20, 30%);
    border-radius: 5px;
    display: flex;
    @media (max-width: 768px) {
      height: 37px;
    }
  }

  .profile {
    background-color: #61dafb;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    @media (max-width: 768px) {
      width: 37px;
      height: 37px;
      border-radius: 37px;
    }
  }

  #comment {
    background-color: #d9d9d9;
    height: 40px;
    width: 380px;
    margin: 5px 20px;
    border: 0;
    border-radius: 30px;
    padding: 0 15px;
    @media (max-width: 768px) {
      height: 27px;
      width: 260px;
      margin: 5px;
    }
  }

  @media (max-width: 768px) {
    width: 340px;
  }
`
export const Comment = () => {
  return (
    <CommentBox>
      <div className="input">
        <div className="profile">
        </div>
        <input type="text" id="comment"/>
      </div>
    </CommentBox>
  )
};

export const Thumbs = styled.button`
  position: absolute;
  bottom: 130px;
  right: 50px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: rgb(0,0,0,0);
  border: 0;
  z-index: 3;

  .thumbs-up {
    font-size: 40px;
    color: white;
    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    bottom: 70px;
    right: 10px;
  }
`