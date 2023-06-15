import React from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { styled } from 'styled-components';

const DiaryDiv = styled.div`
    width: 97vw;
    height: auto;
`;

const Diary = () =>{
    return(
        <DiaryDiv>
            <HeaderBar/>
            <h1>This is Diary</h1>
        </DiaryDiv>
    );
};

export default Diary;