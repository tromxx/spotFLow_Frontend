import React from "react";
import { styled } from 'styled-components';
import SearchBar from "../components/SearchBar/DiarySearchBar";
import avatar from "../images/default_avatar.png"
import { BsPeople } from "react-icons/bs";
import Slider from "../components/Slider";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext} from '../context/UserStore';

import { useEffect ,useState  ,useContext } from "react";
import DiaryCategory from "./DiaryCategory";
import DiaryApi from "../api/DiaryApi";




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
        .MY{
           margin-right: 35px;
           margin-top: 50px;
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

    const [isAll , setIsAll] = useState(true);

    const user = useContext(UserContext);
    
    const navi = useNavigate();


    const activeEnter = (e) => {
        if(e.key === "Enter") {
          handleSearch();
        }
      }

   

    useEffect(()=> {
        if(!user.isLoggedIn) {
            console.log("로그인이 안되었어요");
        }
    })
          const [name,setName] = useState("");
          const [isType, setIsType] = useState(true);



        const [search,setSearch] = useState([]);  

        const [place,setPlace] = useState("");

        const handleSearch = async () => {
            const res = await DiaryApi.searchPlace(place);
            console.log(res.data);
            setSearch(res.data);
        }


    
    if(!user.isLoggedIn) {
        return (
            <>
                <h2 style={{position:"absolute",top:"50%",left:"40%"}}>로그인이 필요한 서비스 입니다.</h2>
            </>
        )
    }

    else 

    return(
        <>
        {
        isAll ? 
        <Container>
            <header>
                <div className="namebar">
                    <div className="namebarleft">
                    <div className="id">
                        <img className="img" src={avatar} alt="" />
                        <h6>{user.email}</h6>
                     </div>
                       
                 </div>
                 <div className="namebarright">
                         <div className="menu">
                            {/* <BsPeople className="people"/> */}
                            <div onClick={()=>{navi("/diaryMypage")}}className="MY">
                                <h3>MY</h3>
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
                {/* <DiaryLayout name={"Popular"}/>
                <DiaryLayout name={"Friend"}/>
                <DiaryLayout name={"Local live"}/>  */}
                <Slider names={"Popular"} setName={setName}  setIsType={()=>setIsType(true)} setIsAll={setIsAll}/>
                <Slider names={"Friend"} setName={setName} setIsType={()=>setIsType(false)} setIsAll={setIsAll}/>
                {/* <Slider name={"Local live"}/> */}
            </DiaryDiv>
            </body>
        </Container>
        : 
        <>
        { isType ? <DiaryCategory name={"Popular"} setIsAll={setIsAll}/> :  
                    <DiaryCategory name={"Friend"} setIsAll={setIsAll}/>
        }
        </>
        }
        </>
        
    );
};

export default Diary;