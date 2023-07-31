import React from "react";
<<<<<<< HEAD
import { styled, useTheme } from "styled-components";
import DiaryContainer from "../components/Diary/DiaryContainer";
import {IoArrowBackCircleOutline, IoAdd} from 'react-icons/io5'
import {AiOutlineUser} from 'react-icons/ai'
import { useState } from "react";
import { useEffect } from "react";
import DiaryApi from "../api/DiaryApi";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";

=======
import { styled } from 'styled-components';
import SearchBar from "../components/SearchBar/DiarySearchBar";
import avatar from "../images/default_avatar.png"
import Slider from "../components/Slider";
import { useNavigate } from 'react-router-dom';
import { UserContext} from '../context/UserStore';
import { useEffect ,useState  ,useContext } from "react";
import DiaryCategory from "./DiaryCategory";
import DiaryApi from "../api/DiaryApi";
import Error from "../components/Common/Error";
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
  height: auto;
  gap: 20px;
  margin-bottom: 100px;
  color: ${props=>props.theme.textColor};
  background-color: ${props=>props.theme.bgColor};
  .UserContainer{
    margin-top: 120px;
    font-family: var(--efont);
    width: 70%;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--grey);
    @media (max-width : 850px){
        margin-top: 20px;
    }
<<<<<<< HEAD
    .Profile{
        display: flex;
=======
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "black" : "white"};
    color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "black"};
    .namebar{
        display: flex;
        width: 80vw;
        height: 15vh;
        justify-content: center;
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
        align-items: center;
        gap: 20px;
        img{
            width: 80px;
            height: 80px;
            border-radius: 80px;
            @media (max-width : 844px){
                width: 50px;
                height: 50px;
            }
        }
<<<<<<< HEAD
=======
    .img{
        width: 70px;
        height: 70px;
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
    }
    .Controler{
        display: flex;
        align-items: center;
        gap: 20px;
    }
<<<<<<< HEAD
  }
`;


const GoBackButton = styled(IoArrowBackCircleOutline)`
 	width: 25px;
  	height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    }
`;

const GoProfileButton = styled(AiOutlineUser)`
 	width: 25px;
  	height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    }
`;

const GoToAdd = styled(IoAdd)`
 	width: 25px;
  	height: 25px;
    cursor: pointer;
    &:hover{
        color: var(--lightblue);
    };
`;


const DiaryContainerDiv = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   margin-top: 80px;
	padding: 30px;

	@media (max-width : 844px){
		margin-top: 10px;
   }
`;

const Diary = () =>{
    const [datas, setData] = useState();
    const {nickname,profilePic} = useContext(UserContext);
    const navigate = useNavigate();
    const theme = useTheme();


    useEffect(()=>{
        const fetchData = async() =>{
            const response = await DiaryApi.findAllDiary();
            setData(response.data);
        };
        fetchData();
    },[])

    return(
        <Container>
            <div className="UserContainer">
                <div className="Profile">
                    <img src={profilePic} alt="error" />
                    <p>{nickname}</p>
                </div>
                <div className="Controler">
                    <GoBackButton onClick={()=>navigate("/")}/>
                    <GoProfileButton onClick={()=>navigate("/diarymypage")}/>
                    <GoToAdd onClick={()=>navigate("/diaryCreate")}/>
                </div>
            </div>
            <DiaryContainerDiv>
                {datas && datas.map(data=>(
                    <DiaryContainer 
                        key={data.id}
                        val={{
                            id : data.id,
                            email : data.email,
                            img : data.img,
                            nickname : data.nickname,
                            profilepic : data.profilePic,
                            title : data.title,
                            like : data.like
                        }}
                    />
                ))
                }
            </DiaryContainerDiv>
        </Container>
=======
    .people{
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: flex-end;
        margin-right: 30px;
    } 
   h3{
		cursor: pointer;
      &:hover{
	      color: var(--blue);
      }
    }
`; 

const DiaryDiv = styled.div`
   width: 80vw;
   height: 80vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: ${(props) => props.theme.bgColor === '#171010' ? "#504C56" : "white"};
`;

const Diary = () =>{
   const [isAll , setIsAll] = useState(true); //Popular 혹은 freind 보여주기 state
   const [friendData, setFriendData] = useState([]); //친구 데이터
   const [hotData,setHotData] = useState([]); //인기 데이터
   const [isSearch,setIsSearch] = useState(false); // 검색
   const user = useContext(UserContext);
   const navi = useNavigate();
	const [name,setName] = useState("");
	const [isType, setIsType] = useState(true);
	const [search,setSearch] = useState([]);  
	const [place,setPlace] = useState("");
	const [type, setType] = useState('popular');



	 //searchBar 눌렀을때 생기는 함수
    const activeEnter = (e) => {
      if(e.key === "Enter") {
         handleSearch();
         setIsSearch(true);
      };
    };

	 
	const handleSearch = async () => {
		const res = await DiaryApi.searchPlace(place);
		setSearch(res.data);
 	}

	
	 //인기 데이터 Axios Api
   const fetchHotData = async () => {
   	const res = await DiaryApi.findMyDiary(user.email);    
      let filteredAndSortedData = (res.data.filter(e=> e.delete !== true));
         
      filteredAndSortedData.sort((a, b) => {
         if (a.like > b.like) {
             return -1;
         }
         if (a.like < b.like) {
             return 1;
         }
         return 0;
      });
      setHotData(filteredAndSortedData);    
      console.log(res.data);
   };
      
   const fetchFriendData = async () => {
      const res = await DiaryApi.searchFreind(user.email);    
      setFriendData(res.data);
   	};
      useEffect(() => {
        fetchHotData();
        fetchFriendData();
   }, []);
   
   if(!user.isLoggedIn) {
      return (
         <div>
				<Error/>
         </div>
      )
    }
    else 
    return(
        <>
        <Container>
            <header>
               <div className="namebar">
                    <div className="namebarleft">
                    <div className="id">
                        <img className="img" src={user.profilePic} alt="" />
                        <h6>{user.nickname}</h6>
                     </div>
                 </div>
                 <div className="namebarright">
                         <div className="menu">
                            <div onClick={()=>{navi("/diaryMypage")}}className="MY">
                              <h3 className="MyH3">MY</h3>
               				</div>
                        </div>
                     </div>
                </div>
            </header>
            <div className="searchBar1">
                    <SearchBar setPlace={setPlace} activeEnter={activeEnter} setSearch={setSearch} />
                 </div>
            <body>
            <DiaryDiv>
              	{ isSearch &&  <Slider setIsSearch={setIsSearch} isSearch={isSearch}  email={user.email} names={`${search.length} 개의 검색결과`} setName={setName}  setIsType={()=>setIsType(true)} setIsAll={setIsAll} data={search}/> }
               <Slider names={"Popular"} setName={setName}  setIsType={()=>setIsType(true)} setIsAll={setIsAll} data={hotData}/>
               <Slider names={"Friend"} setName={setName} setIsType={()=>setIsType(false)} setIsAll={setIsAll} data={friendData}/>
            </DiaryDiv>
            </body>
        </Container>
        : 
        <>
        	{ isType ? 
            <DiaryCategory isType={isType} fetchData={fetchHotData} name={"Popular"} setIsAll={setIsAll} data={hotData}/> :  
            <DiaryCategory isType={isType} fetchData={fetchFriendData} name={"Friend"} setIsAll={setIsAll} data={friendData}/>
         }
        </>
        </>
        
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
    );
};

export default Diary;