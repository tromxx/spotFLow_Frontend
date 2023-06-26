import React from "react";
import { styled } from "styled-components";
import MyDiary from "../components/MyDiary";

const DiaryMypagediv = styled.div`
    width: 60vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: beige;
    border-radius: 10px;
`;


const DiaryMypage = () => {
    return(
        <DiaryMypagediv>
            <MyDiary/>
        </DiaryMypagediv>
    );
};

export default DiaryMypage;