import React from "react";
import { styled } from "styled-components";

const DiaryLayoutdiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: white;
height: 100vh;
color: black;


`;

const DiaryGrid = styled.div`
    /* position: relative; */
    display: flex;
    left: 250px;
    top : 50vh;
    width: 900px;
    height: 500px;
    border: 2px #d6d6d6 solid;
    border-radius: 5px;
    justify-content: center;
    /* position: absolute 50%; */
`;

const DiaryLayout = () => {
    return(
            <DiaryLayoutdiv>
                <DiaryGrid>
                        
                </DiaryGrid>
            </DiaryLayoutdiv>
    );
};
export default DiaryLayout;