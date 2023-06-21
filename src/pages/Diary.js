import React from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { styled } from 'styled-components';
import DiaryLayout from "../components/DiaryLayout";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;

    .namebar{
        width: 80vw;
        height: 18vh;
    }

`; 

const DiaryDiv = styled.div`
    width: 80vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: beige;
`;


const Diary = () =>{
    return(
        <Container>
            <header>
                <div className="namebar">
                </div>
            </header>
            <body>
            <DiaryDiv>
                <DiaryLayout name={"Popular"}/>
                <DiaryLayout name={"Friend"}/>
                <DiaryLayout name={"Local live"}/>
            </DiaryDiv>
            </body>
        </Container>
        
    );
};

export default Diary;