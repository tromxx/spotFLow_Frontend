import {styled} from "styled-components";
import {Swiper, SwiperSlide} from "swiper/react";
import {BsChatDots, BsSend} from "react-icons/bs";

export const DiarySwipe = styled(Swiper)`
  position: absolute;
  width: 75vw;
  height: 68vh;
  background-color: white;
  display: flex;
  border-radius: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    border: 2px solid #d9d9d9;
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
  font-size: 20px;
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
    //background-color: rgb(20, 20, 20, 30%);
    border-radius: 5px;
    position: relative;
    display: flex;
    @media (max-width: 768px) {
      height: 37px;
    }
  }
  hr{
    opacity: 30%;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .profile {
    background-color: #61dafb;
    border-radius: 45px;
    width: 45px;
    height: 45px;
    margin-top: 2px;
    margin-left: 5px;
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
  .caption {
    color: grey;
    font-size: .8rem;
    margin-top: 25px;
    margin-left: 10px;
  }
  .btn-send {
    position: absolute;
    right: 22px;
    top: 7px;
    height: 36px;
    width: 36px;
    border-radius: 36px;
    border: 0;
    background-color: #caf0f8;
    @media(max-width: 768px) {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      top: 6px;
      right: 8px;
    }
  }
  .send {
    font-size: 20px;
    margin-top: 5px;
    color: #00b4d8;
    @media(max-width: 768px) {
      font-size: 12px;
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
          <img src={`${process.env.PUBLIC_URL}/public_assets/default_avatar.png`}/>
        </div>
        <input type="text" id="comment"/>
        <button className="btn-send">
          <BsSend className="send"/>
        </button>
      </div>
      <hr/>
      <p className="caption">댓글 1</p>
      <div className="content">
        <div>
        </div>
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