import React from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { styled } from 'styled-components';
import DiaryLayout from "../components/DiaryLayout";


const DiaryDiv = styled.div`
    width: 80vw;
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 10%;
    top:30%;
    background-color: beige;
    

`;


const Diary = () =>{
    return(
        <DiaryDiv>
            <DiaryLayout/>
        </DiaryDiv>
        
    );
};

export default Diary;