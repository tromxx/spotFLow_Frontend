import React, {useContext, useState} from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {styled} from "styled-components";
import {WebSocket} from "../App";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #caf0f8;
  
  .box-chat {
    margin: auto;
    width: 60%;
    height: 100%;
    background-color: white;
    padding: 8vh 20px 20px 20px;
    
  }
  
`

const DirectMessenger = () => {
  const webSocketService = useContext(WebSocket);
  const [text, setText] = useState("ㅎㅎ");
  // const token = localStorage.getItem("authToken");
  let chat = {
    type: "ENTER",
    roomId: 1,
    sender: "user01@",
    message: "test Message"
  };

  function Send() {
    webSocketService.send("/message", {}, chat);
  }

  function Subscribe() {
    console.log(webSocketService);
    webSocketService.subscribe("/message", (data) => {
      console.log(data.message);
      setText(data.message);
    });
  }
  // const endPoint = "http://localhost:8111/ws";
  // const stompClient = Stomp.over(new SockJS(endPoint));
  // const header = {
  //   headers : {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // };
  //
  // stompClient.connect(header, function (frame) {
  //   console.log("connected: " + frame);
  //   console.log("연결 테스트")
  // });
  // function Send() {
  //   stompClient.send("/app/message", header, JSON.stringify(chat));
  // }
  //
  // function Subscribe() {
  //   stompClient.subscribe("/notification/message"+chat.sender, function (response) {
  //     const data = JSON.parse(response.body);
  //     console.log(data);
  //     setText(data.message);
  //   });
  // }

  return (
    <Container>
      <div className="box-chat">
        <p>웹 소켓 테스트입니다.</p>
        <button className="first" onClick={Subscribe}>subscribe</button>
        <button className="second" onClick={Send}>send</button>
        <span>{text}</span>
      </div>

    </Container>
  );
}

export default DirectMessenger;