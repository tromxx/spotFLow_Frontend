import React from 'react'
import { useState , useRef, useEffect , forwardRef } from 'react';
import styled , {css} from 'styled-components'
import profile from '../images/default_avatar.png'

const centerAlign = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Info = styled.div`
    
     justify-content: space-evenly;
        flex: 7;
        ${centerAlign}
        width: 92.5%;

        flex-direction:row;
`

const Title = styled.div`
    padding:10px;
    border: 1px solid silver;
    border-radius:5px;
    width: 91.5%;
    flex: 2;
    margin-bottom: 10px;
`

const Content = styled.div`
padding:10px;
border: 1px solid silver;
    border-radius:5px;
    width: 91.5%;
    flex: 30;
    margin-bottom: 20px;
`

const Container = styled.div`
    ${centerAlign}

    position: fixed;
    top:10%;
    left:25%;
    width: 50vw;
    height: 80vh;
    border: 1px solid silver ;
    border-radius: 5px;
    background-color: white ;

    @media(max-width: 1000px) {
        & {
        width: 300px;
        height: 70%;
        top:20%;
    left:10%;
        }
    }

    display: ${props => props.isOpen ? "block" : "none"}
    
   
  
    ;
    .profile {
        ${centerAlign}
        flex-direction: column;
        height : 100%;
        width: 100%;
       // border : 1px solid;
    }
`;

const TimeLineModal =  forwardRef(({isOpen,closeModal, setIsModalOpen, modalData},node)=> {
  return (
    <Container ref={node} isOpen={isOpen} closeModal={closeModal}>
    
        <div  className='profile'>
            
                <Info>
                    <img  src={profile} style={{width:"50px" , height: "50px"}} />
                    <div  style={{width: "100%" , border:"1px solid silver" , marginLeft:"10px"}}>
                        <div style={{width: "95%" , marginLeft:"10px"}}>{modalData.name}</div>
                        <div style={{width: "95%" , marginLeft:"10px"}}>{modalData.date}</div>
                    </div>
                </Info>

                <Title>
                    {modalData.title}
                </Title>

                <Content>
                    {modalData.content}
                </Content>
        </div>

    </Container>
  )
});

export default TimeLineModal