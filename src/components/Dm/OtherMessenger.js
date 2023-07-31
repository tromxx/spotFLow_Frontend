import React from 'react';
import {styled} from "styled-components";

const Container = styled.div`
  max-width: 500px;
  min-height: 70px;
  box-sizing: border-box;
  margin-left: auto;
  
  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  };
  p {
    margin-right: auto;
    background-color: #00b4d8;
    color: white;
    padding: 10px;
    border-radius: 10px;
    @media(max-width: 768px) {
      max-width: 200px;
      font-size: .8rem;
    }
  }
  
  span {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: .4rem;
    color: rgb(30, 30, 30, 30%);
    @media(max-width: 768px) {
      bottom: 1px;
    }
  }
`;

const OtherMessenger = (props) => {

  return (
    <>
      <Container>
        <div className="box">
          <p>동해물과 백두산이 마르고 닳도록</p>
          <span>yyyy-mm-dd 7:43 am</span>
        </div>
      </Container>

    </>
  )
}

export default OtherMessenger;