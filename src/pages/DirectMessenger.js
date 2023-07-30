import React, {useContext, useEffect, useState} from 'react';
import {styled} from "styled-components";
import {WebSocket} from "../App";
import {BsSend} from "react-icons/bs";
import {CommentBox} from "../components/DiaryDetail/SwiperComponent";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #caf0f8;
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

  hr {
    opacity: 30%;
  }

  img {
    max-width: 45px;
    @media (max-width: 390px) {
      max-width: 37px;
    }
  }

  .profile {
    background-color: #61dafb;
    border-radius: 45px;
    width: 45px;
    height: 45px;
    margin-top: 2px;
    margin-left: 5px;
    overflow: hidden;
    border: .5px solid rgb(30,30,30,30%);
    @media (max-width: 768px) {
      width: 37px;
      height: 37px;
      border-radius: 37px;
    }
  }

  #comment {
    background-color: #eee;
    height: 40px;
    width: 380px;
    margin: 5px 20px;
    border: 0;
    border-radius: 30px;
    padding-left: 15px;
    padding-right: 45px;
    @media (max-width: 768px) {
      height: 27px;
      width: 260px;
      margin: 4px 6px;
      padding-right: 35px;
    }
  }

  .caption {
    color: grey;
    font-size: .8rem;
    margin-top: 25px;
    margin-left: 5px;
  }

  .btn-send {
    position: absolute;
    display: flex;
    right: 22px;
    top: 7px;
    height: 36px;
    width: 36px;
    border-radius: 36px;
    border: 0;
    background-color: #caf0f8;
    @media (max-width: 768px) {
      width: 24px;
      height: 24px;
      border-radius: 24px;
      top: 6px;
      right: 8px;
    }
  }

  .send {
    font-size: 20px;
    //margin-top: 5px;
    color: #00b4d8;
    align-self: center;
    justify-self: center;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .box-chat {
    margin: auto;
    width: 60%;
    height: 100%;
    background-color: white;
    padding: 8vh 20px 20px 20px;
  }

`

const DirectMessenger = (props) => {
  const webSocketService = useContext(WebSocket);
  const [text, setText] = useState("ㅎㅎ");
  // const token = localStorage.getItem("authToken");
  let chat = {
    type: "ENTER",
    roomId: 1,
    sender: "user01@",
    message: text
  };

  function Send() {
    webSocketService.send("/message", {}, chat);
  }

  function Subscribe() {
    console.log("구독!");
    webSocketService.subscribe("/message", (data) => {
      console.log(data.message);
      setText(data.message);
    });
  }

  const onChangeComment = (e) => {
    setText(e.target.value);
  }
  useEffect(()=>{
    if (webSocketService) {
      Subscribe();
    }
  },[webSocketService]);
  return (
    <Container>
      <div className="box-chat">
        <div className="input">
          <div className="profile">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/spotflow-5475a.appspot.com/o/default_avatar.png?alt=media&token=7ea670df-ff84-4a85-bdb2-41b9a7f6a77a"/>
          </div>
          <input type="text" id="comment" value={text} onChange={onChangeComment}/>
          <button className="btn-send" onClick={Send}>
            <BsSend className="send" />
          </button>
        </div>
        <div>
          <p>웹 소켓 테스트입니다.</p>
          <span>{text}</span>
        </div>
      </div>
    </Container>
  );
}

export default DirectMessenger;