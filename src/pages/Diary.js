import React from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { styled } from 'styled-components';
import DiaryLayout from "../components/DiaryLayout";

const DiaryDiv = styled.div`
    width: 100vw;
    height: auto;
`;

const Diary = () =>{
    return(
        <DiaryDiv>
            <HeaderBar/>
            <DiaryLayout/>
        </DiaryDiv>
    );
};

export default Diary;