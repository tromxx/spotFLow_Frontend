import React from "react";
import { styled } from "styled-components";

const DiaryLayoutdiv = styled.div`
    margin-top: 0px;
    width: 80vw;
    height: 20vw;
    color: black;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-top: 12px solid var(--blue);
    position: relative;

    *{
        box-sizing: border-box;
        border: solid 1px royalblue;
    }
    .designbar{
        border: solid 1px black;
        width: 100%;
        height: auto;
        border-bottom: 3px solid var(--blue);
        position: absolute;
        margin-bottom: 140px;
        
    }

    .h4{
        display: flex;
        justify-content: flex-start;
        text-align: center;
        align-items: center;
        width: 10%;
        height: 35px;
        border: solid 1px gray;
    }

    .h6{
        border: solid 1px blue;
        width: 10%;
        height: 38px;
        display: flex;
        position: absolute;
        text-align: center;
        align-items: flex-end;
        left: 90%;
        top:3%;
    }

    .firstcontents{
        border: solid 1px red;
        width: 100%;
        height: 100px;
        display: flex;
        /* flex-direction: column; */
        justify-content: flex-end;
    }


    
`;


const DiaryLayout = () => {
    return(
        <DiaryLayoutdiv>
            <div className="designbar">
                <div className="h4">
                    <h4>Popular</h4>
                </div>
                <div className="h6">
                    <h6>See All</h6>
                </div>
            </div>
            <div className="firstcontents">
                    <div>내용</div>
                    <div>내용</div>
                    <div>내용</div>
            </div>
        </DiaryLayoutdiv>
    );
};
export default DiaryLayout;