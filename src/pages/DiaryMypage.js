import React, { useState } from "react";
import { styled } from "styled-components";
import MyDiary from "../components/MyDiary";
import SearchBar from "../components/SearchBar/DiarySearchBar";
import { BsPeople } from "react-icons/bs";
import avatar from "../images/default_avatar.png"
import { BsTrash } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';



const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: gray; */
    position: relative;
    top:70px;

    .namebar{
        display: flex;
        width: 70vw;
        height: 15vh;
        /* border: solid 5px red; */
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        }
        .namebarleft{
            width: 80%;
            height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: end;
        }
        .namebarright{
            width: 20%;
            height: 60px;
            display: flex;
            justify-content: flex-end;
            top:60px;
        }
        
        .menu{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 5px;
            
            /* margin-right: 30px;   */
        }

        .id{
            display: flex;
            justify-content: center;
            align-items: center;
        }

    .img{
        width: 70px;
        height: 70px;
   //     margin-right: 20px;
    }

    .searchBar1{
        display: flex;
        /* justify-content: center; */
        align-items:center;
        width: 100%;
        height: 100%;
    }
        
    .list{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        &:hover{
            color: gray;
            font-weight: bold;
        }
        /* margin-right: 10px; */
    }

    .people{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        /* margin-right: 20px; */
    } 
    .trash{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        /* margin-right: 20px; */
    }
    `;

const DiaryMypagediv = styled.div`
    width: 70vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: beige; */
    margin-top: 20px;
    border: solid 3px black;
    border-radius: 10px;
`;

    const DiaryMypage = () => {

    const navi = useNavigate();

    const [isCheckBox, setIsCheckBox] = useState(false);

    const convertCheckBox = () => {
        if(isCheckBox === false) setIsCheckBox(true)
        else setIsCheckBox(false);
        console.log(isCheckBox);
    };

    return(
        <Container>
             <header>
                <div className="namebar">
                    <div className="namebarleft">
                    <div className="id">
                        <img className="img" src={avatar} alt="" />
                        <h6>whddus426</h6>
                     </div>
                
                 </div>
                 <div className="namebarright">
                         <div className="menu">
                                <BsListUl onClick={()=>{navi("/diary")}} className="list"/>
                                <BsPeople className="people"/>
                                <BsTrash className="trash" onClick={convertCheckBox}/>
                        </div>
                    </div>
                </div> 
                <div className="searchBar1">
                    <SearchBar/>
                 </div>   
            </header>
            <body>
        <DiaryMypagediv>
            <MyDiary stat={isCheckBox}/>
        </DiaryMypagediv>
        </body>
        </Container>
    );
};

export default DiaryMypage;