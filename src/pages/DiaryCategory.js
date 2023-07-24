import React, { useEffect, useState } from "react";
import { styled } from 'styled-components';
import DiaryCate from "../components/DiaryCate";
import { BsPeople } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';



const Container = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
 
    /* background-color: gray; */
    position: relative;
    /* @media (max-width:900px) {
        grid-template-columns: 1fr 1fr ;
    } */
    /* top:20px; */
    .total {
        position: absolute;
        width: 70vw;
        height: 70vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* @media (max-width:850px) {
        grid-template-columns: 1fr 1fr ;
    }
        @media (max-width:550px) {
        grid-template-columns: 1fr;
    } */
    }
    
    .namebar{
        display: flex;
        width: 70vw;
        height: 20vh;
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
        margin-right: 2px;
        &:hover{
            color: gray;
            font-weight: bold;
        }
    }
    `; 

const DiaryCategoryDiv = styled.div`
    width: 100%;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: beige; */
    /* border-radius: 10px; */
    /* @media (max-width:900px) {
        grid-template-columns: 1fr 1fr ;
    } */
`;


const DiaryCategory = ({name,stat,setIsAll}) =>{

    const navi = useNavigate();
    let checkbox = 0;


    useEffect(() => {
        checkbox = stat;
    }, [stat]);

    return(
        <Container>
            <div className="total">
                <div className="namebar">
                    <div className="left">
                        <div className="titlebar">
                            <h1>{name}</h1>
                        </div>
                    </div>
                    < div className="right">
                        <BsListUl onClick={()=>{setIsAll(true)}} className="list1"/>
                    </div>
                </div>
                <DiaryCategoryDiv>
                        <DiaryCate/>
                </DiaryCategoryDiv>
            </div>
        </Container>
    );
};

export default DiaryCategory;