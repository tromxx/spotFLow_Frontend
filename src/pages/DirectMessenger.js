import React, {useState} from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {styled} from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  
  p {
    position: absolute;
    top: 10vh;
    left: 20px;
  }
  
  .first {
    position: absolute;
    top: 15vh;
    left: 20px;
  }
  .second {
    position: absolute;
    top: 15vh;
    left: 100px;
  }
  
`

const DirectMessenger = () => {
  const [text, setText] = useState("ㅎㅎ");

  const endPoint = "http://localhost:8111/ws";
  const stompClient = Stomp.over(new SockJS(endPoint));
  
  const header = {
    userId : "testId"
  };

  stompClient.connect(header, function (frame) {
    console.log("connected: " + frame);
    console.log("연결 테스트")
  });



  function Send() {
    let chat = {
      roomId: 1,
      sender: "user01",
      message: "test messaage",
      MessageType: "ENTER"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chat));
  }

  function Subscribe() {
    stompClient.subscribe("/notification/message", function (response) {
      const data = JSON.parse(response.body);
      console.log(data);
      setText(data.message);
    });
  }

  return (
    <Container>
      <p>웹 소켓 테스트입니다.</p>
      <button className="first" onClick={Subscribe}>subscribe</button>
      <button className="second" onClick={Send}>send</button>
      <span>{text}</span>
    </Container>
  );
}

export default DirectMessenger;