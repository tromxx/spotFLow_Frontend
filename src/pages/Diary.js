import React from "react";
import { styled } from 'styled-components';
import SearchBar from "../components/SearchBar/DiarySearchBar";
import avatar from "../images/default_avatar.png"
import { BsPeople } from "react-icons/bs";
import Slider from "../components/Slider";
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
        width: 80vw;
        height: 15vh;
        /* border: solid 5px red; */
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        }
        .namebarleft{
            display: flex;
            justify-content: flex-start;
            align-items: end;
        }
        .namebarright{
            display: flex;
            justify-content: flex-end;
        }
        
        .menu{
            display: flex;
            align-items: center;
            justify-content: center;
            /* margin-right: 50px;  */
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
        width: 82%;
        height: 10%;
        margin-bottom: 10px;
        
       
    }
    .people{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;
    } 
    h3{
        &:hover{
            color: gray;
            font-weight: bold;
        }
    }

`; 

const DiaryDiv = styled.div`
    width: 80vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: beige; */
`;


const Diary = () =>{

    const navi = useNavigate();

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
                            <BsPeople className="people"/>
                            <div onClick={()=>{navi("/diaryMypage")}}className="MY">
                                <h3>MY</h3>
                                 </div>
                            </div>
                        </div>
                </div>
            </header>
            <div className="searchBar1">
                <SearchBar/>
                 </div>
            <body>
            <DiaryDiv>
                {/* <DiaryLayout name={"Popular"}/>
                <DiaryLayout name={"Friend"}/>
                <DiaryLayout name={"Local live"}/>  */}
                <Slider name={"Popular"}/>
                <Slider name={"Friend"}/>
                <Slider name={"Local live"}/>
            </DiaryDiv>
            </body>
        </Container>
        
    );
};

export default Diary;