import React, { useState } from "react";
import { styled } from "styled-components";
import MyDiary from "../components/MyDiary";
import SearchBar from "../components/SearchBar/DiarySearchBar2";
import { BsPeople } from "react-icons/bs";
import avatar from "../images/default_avatar.png"
import { BsTrash } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';
import DiaryApi from "../api/DiaryApi";
import axios from "axios";
import { UserContext} from '../context/UserStore';
import { useEffect , useContext } from "react";




const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: gray; */
  
    position: relative;
    top:50px;
    @media (max-width: 850px) {
      & {
        top:0;
      }
    }
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "black" : "white"};
    color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "black"};
    .namebar{
        display: flex;
        width: 70vw;
        height: 15vh;
        /* border: solid 5px red; */
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 400px) {
            width: 90vw;
        }
        }
        .namebarleft{
            width: 75%;
            height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: end;
        }
        .namebarright{
            width: 25%;
            height: 60px;
            display: flex;
            justify-content: center;
            top:60px;
        }
        
        .menu{
            /* width: 75%; */
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;
        }

        .id{
            display: flex;
            justify-content: center;
            align-items: center;
            h6{
                font-size: 13px;
                margin-left: 15px;
            }
        }

    .img{
        width: 70px;
        height: 70px;
   //     margin-right: 20px;
    }

    .searchBarline{
        display: flex;
        justify-content: space-between;
        align-items:center;
        width: 100%;
        height: 100%;
    }
    .cancel{
        border: solid 1px #00b4d8; 
        background-color: white;
        color: black;
        width: 50px;
        height: 40px;
        font-size: 0.8rem;
        border-radius: 10px;
        text-align: center;
        font-family: 'Black Han Sans', sans-serif;

        
        /* display: flex;
        justify-content: center;
        text-align: center; */
        }

        
    .list{
        /* margin: 80%; */
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        &:hover{
            color: gray;
            font-weight: bold;
        }
        margin-right: 20px;
    }

    /* .people{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        margin-right: 20px;
    }  */
    .trash{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        /* margin-right: 20px; */
    }
    /* .Search-bar {
        padding: 0;
        margin-left: 0;
    } */
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
    border-radius: 20px;
    @media (max-width: 400px) {
        width: 90vw;
        border: solid 1px black;
    }
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "white"};


`;


    const DiaryMypage = () => {

    const user = useContext(UserContext);
    
    const [trigger, setTrigger] = useState(false);

    const navi = useNavigate();

    const [isCheckBox, setIsCheckBox] = useState(false);

    const [data,setData] = useState([]);

    const [checkid, setCheckId] = useState([]) ; 

    const forceUpdate = () => {
        setTrigger(prev => !prev);
    };

    const convertCheckBox = () => {
        if(isCheckBox === false) setIsCheckBox(true)
        else setIsCheckBox(false);
        console.log(isCheckBox);
    };
    
        const handleDeleteItem = async () => {
                try {
                const res = await DiaryApi.deleteDiary(checkid);
                console.log(res.data);
                alert(`${checkid.length}개의 다이어리가 삭제되었습니다.`)
                if(res.status == 200) {
                   setTimeout(forceUpdate(),1500);
                }
                } catch(error) {
                    console.log("삭제실패",error);
                }
                
          };
          useEffect(() => {
            console.log(data);
        }, [trigger]);
        
    return(
        
        <Container>
             <header>
                <div className="namebar">
                    <div className="namebarleft">
                    <div className="id">
                        <img className="img" src={avatar} alt="" />
                        <h6>{user.nickname}</h6>
                     </div>
                
                 </div>
                 <div className="namebarright">
                       
                    </div>
                </div> 
                <div className="searchBarline">
                    <SearchBar/>
                    <div className="menu">
                                {isCheckBox ? (
                                    <>
                                        <button 
                                            className="cancel" 
                                            style={{marginRight: "10px"}}
                                            onClick={convertCheckBox}>Cancel</button>
                                        <button 
                                            onClick={handleDeleteItem}                                      
                                            className="cancel"
                                            style={{border:"solid 1px #f24e1e", color:"#f24e1e"}}
                                            >Delete</button>
                                    </>)
                                : (
                                    <>
                                        <BsListUl onClick={()=>{navi("/diary")}} className="list"/>
                                        <BsTrash className="trash" onClick={convertCheckBox}/>
                                    </>)
                                }
                        </div>
                 </div>   
            </header>
            <body>
        <DiaryMypagediv>
            <MyDiary email={user.email}trigger={trigger} stat={isCheckBox} checkid={checkid} setCheckId={setCheckId} data={data}/>
        </DiaryMypagediv>
        </body>
        </Container>
    );
};

export default DiaryMypage;