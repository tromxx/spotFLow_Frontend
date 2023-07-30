import React, { useEffect } from 'react';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserStore';
import { VscBellDot, VscBell } from 'react-icons/vsc'
import { styled } from 'styled-components';

const NofiOn = styled(VscBellDot)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  &:hover{
    color: var(--lightblue);
  }
`;

const NofiNone = styled(VscBell)`
  width: 30px;
  height: 30px;
  color : ${props=>props.theme.textColor};
  &:hover{
    color: var(--lightblue);
  }
`;

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
  
`;


const NotificationSocket = () => {

  
  const endPoint = "http://localhost:8111/ws";
  const stompClient = Stomp.over(new SockJS(endPoint));
  localStorage.setItem("client", stompClient);
  console.log(localStorage.getItem("client"));
  const header = {
    userId : "testId"
  };

  useEffect(() => {
    stompClient.connect(header, function (frame) {
      console.log("connected: " + frame);
      if(email !== "") {
        Subscribe();
      }
      
    });
    return () => {
      stompClient.disconnect();
    };
  }, []);

  const { email, received, setReceived } = useContext(UserContext);

  function Send(request) {
    
    stompClient.send("/app/sendnoti", {}, JSON.stringify(request));
  }

  function Subscribe() {
    stompClient.subscribe(`/notification/${email}`, function (response) {
      const data = JSON.parse(response.body);
      console.log(data);
      setReceived(response.body);
    });
  }
  const handleNoti = () => {
    // navigate("notification");
    setReceived("");
  }
  return (
    // <Container>
    //   <p>웹 소켓 테스트입니다.</p>
    //   <button className="first" onClick={Subscribe}>subscribe</button>
    //   <button className="second" onClick={Send}>send</button>
    //   <button className="noti" onClick={()=>{handleNoti()}}>
    //           {received !== "" ? <NofiOn /> : <NofiNone />}
    //       </button>
    // </Container>
      <>
      </>
  );
}

export default NotificationSocket;