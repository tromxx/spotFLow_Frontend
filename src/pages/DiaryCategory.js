import React, { useEffect, useState } from "react";
import { styled } from 'styled-components';
import DiaryCate from "../components/DiaryCate";
import { BsPeople } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';



const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: gray; */
    position: relative;
    top:40px;
    
    .namebar{
        display: flex;
        width: 60vw;
        height: 25vh;
        /* border: solid 5px red; */
        justify-content: center;
        align-items: end;
    }
    .left{
        width: 50%;
        display: flex;
        justify-content: flex-start;
    }
    .right{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 20px;
        margin-right: 20px;
        
    }
    .titlebar{
        /* border: solid 1px green; */
        width: 50%;
        height: 50%;
        display: flex;
        /* justify-content: center; */
        align-items: end;
    }
    h1{
        display: flex;
        justify-content: center;
        background-color: #00b4d8;
        color: white;
        width: 130px;
        border-radius: 10px;
    }
    .people{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        /* margin-right: 50px; */
        /* margin-bottom: 40px; */
    } 
    .list1{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        margin-right: 20px;
        &:hover{
            color: gray;
            font-weight: bold;
        }
    }
    `; 

const DiaryCategoryDiv = styled.div`
    width: 60vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: beige; */
    border-radius: 10px;
`;


const DiaryCategory = (props) =>{

    const navi = useNavigate();
    let checkbox = 0;


    useEffect(() => {
        checkbox = props.stat;
    }, [props]);

    return(
        <Container>
            <div className="namebar">
                <div className="left">
                    <div className="titlebar">
                        <h1>Popular</h1>
                    </div>
                </div>
                < div className="right">
                    <BsListUl onClick={()=>{navi("/diary")}} className="list1"/>
                    <BsPeople className="people"/>
                </div>
            </div>
            <DiaryCategoryDiv>
                    <DiaryCate/>
            </DiaryCategoryDiv>
        </Container>
    );
};

export default DiaryCategory;