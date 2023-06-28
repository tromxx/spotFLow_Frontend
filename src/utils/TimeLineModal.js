import React from 'react'
import { useState } from 'react';
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
    
    border: 1px solid;
    width: 92.5%;
    flex: 3;
    margin-bottom: 10px;
`

const Content = styled.div`
border: 1px solid;
    width: 92.5%;
    flex: 30;
    margin-bottom: 10px;
`

const Container = styled.div`
    ${centerAlign}

    position: fixed;
    top:10%;
    left:25%;
    width: 50vw;
    height: 80vh;
    border: 1px solid ;
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
        border : 1px solid;
    }
`;

function TimeLineModal({isOpen,closeModal}) {
  return (
    <Container isOpen={isOpen}>
    
        <div className='profile'>
            
                <Info>
                    <img src={profile} style={{width:"50px" , height: "50px"}} />
                    <div style={{width: "100%" , border:"1px solid" , marginLeft:"10px"}}>
                        <div style={{width: "95%" , border:"1px solid", marginLeft:"10px"}}>이름</div>
                        <div style={{width: "95%" ,border:"1px solid", marginLeft:"10px"}}>날짜</div>
                    </div>
                </Info>

                <Title>
                    df
                </Title>

                <Content>
                    d
                </Content>
        </div>

    </Container>
  )
}

export default TimeLineModal