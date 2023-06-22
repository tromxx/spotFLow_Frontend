import React from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { styled } from 'styled-components';
import DiaryLayout from "../components/DiaryLayout";
import SearchBar from "../components/SearchBar";
import avatar from "../images/default_avatar.png"
import { BsPeople } from "react-icons/bs";



const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;

    .namebar{
        display: flex;
        width: 80vw;
        height: 18vh;
        border: solid 5px red;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        
    .menu{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 50px;
        }
        .id{
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }
    img{
        width: 70px;
        height: 70px;
        margin-right: 20px;
        
    }
    .searchBar{
        width: 100px;
        height: 100px;
    }
    .people{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;
    }
    h3{
        font-style: 
    }

    

`; 

const DiaryDiv = styled.div`
    width: 80vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: beige;
`;


const Diary = () =>{
    return(
        <Container>
            <header>
                <div className="namebar">
                    <div className="id">
                <img src={avatar} alt="" />
                <h6>whddus426</h6>
                </div>
                <div className="searchBar1">
                    <SearchBar  />
                    </div>
                            <div className="menu">
                        <BsPeople className="people"/>
                        <div className="MY">
                        <h3>MY</h3>
                        </div>
                        </div>
                </div>
            </header>
            <body>
            <DiaryDiv>
                <DiaryLayout name={"Popular"}/>
                <DiaryLayout name={"Friend"}/>
                <DiaryLayout name={"Local live"}/>
            </DiaryDiv>
            </body>
        </Container>
        
    );
};

export default Diary;