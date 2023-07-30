import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const endPoint = "http://localhost:8111/ws";
const stompClient = Stomp.over(new SockJS(endPoint));
const header = {
  headers : {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};

class WebSocketProvider {
  constructor() {
    this.stompClient = stompClient;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.stompClient.connect(header, (frame) => {
        console.log("connected: " + frame);
        resolve(frame);
      }, (error) => {
        console.error("Error while connecting: " + error);
        reject(error);
      });
    });
  }

  send(path, headers, body) {
    const url = "/app" + path;
    this.stompClient.send(url, headers, JSON.stringify(body));
  }

  subscribe(path, callback) {
    const url = "/notification" + path;
    return this.stompClient.subscribe(url, (response) => {
      const data = JSON.parse(response.body);
      callback(data);
    });
  }

  disconnect() {
    this.stompClient.disconnect();
  }
}

export default WebSocketProvider;