import React from "react";
import { styled } from 'styled-components';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
    position: relative;
    top:40px;


    .namebar{
        display: flex;
        width: 80vw;
        height: 25vh;
        border: solid 5px red;
        justify-content: center;
        align-items: center;
    }
    `; 

const DiaryCategoryDiv = styled.div`
    width: 80vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: beige;
`;


const DiaryCategory = () =>{
    return(
        <Container>
            <div className="namebar"></div>
            <DiaryCategoryDiv>
        
            </DiaryCategoryDiv>
        </Container>
    );
};

export default DiaryCategory;