import React, {useContext,useState,useEffect} from 'react'
import styled, {css} from 'styled-components'
import  { UserContext } from "../context/UserStore";
import {BsGrid3X3} from "react-icons/bs";
import {RiMapPinTimeLine,RiCheckboxBlankFill} from "react-icons/ri";
import {MdPersonOff} from "react-icons/md"

import { PiChatCenteredTextLight } from "react-icons/pi";
import {GiNotebook} from "react-icons/gi";
import userTimelineApi from '../api/UserTimelineApi';
import DiaryApi from '../api/DiaryApi';
import CustomerApi from '../api/CustomerApi';
import { useParams ,useNavigate} from 'react-router-dom';



const centerAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
    overflow:hidden;
    position:relative;
    top:40px;
    ${centerAlign}
    width: 100vw;
    height: 100vh;
  //  border: 1px solid;
    @media (max-width: 840px) {
        top:0px;
    }
`
const List = styled.div`

    height: 100%;
    width: 50%;
  //  border:1px solid;

    @media (max-width: 840px) {
        width: 100%;
    }

    
`
const Header = styled.div`
    ${centerAlign}
    flex-direction:row;
    justify-content:start;
    height: 20%;
    width: 100%;
    border: 0.5px solid silver;
    .profile {
        ${centerAlign}
        width: 90%;
        margin-left: 20px;
        height: 100%;
            @media (max-width: 840px) {
                margin-left : 80px;
                width: 60%;
            }

        img{
            width: 100px;
            height: 100px;
            border-radius: 100%;
            border:1px silver solid;
        }
        .profile-pic {
            {}
        }

        .profile-side {
            margin-left: 20px;
         //   border: 1px solid;
            width: 100%;
            height: 60%;

            .group {
                ${centerAlign}
                flex-direction: column;
                height: 100%;

                .info{
                    ${centerAlign};
                    justify-content: space-evenly;
                    height: 75%;
             //       border: 1px solid;
                    width:100%;
                }
                button {
                    background-color: skyblue;
                    color:white;
                    border: none;
                    border-radius: 20px;
                }
                .info-name {
                    position: relative;
                    ${centerAlign};
                    flex-direction:column;
                    justify-content:space-evenly;
                    width: 100px;
                    height:60px;
              //      border:1px solid;

                    p{
                        position:absolute;
                        bottom:20px;
                    }
                }
            }
        }
    }
`

const StatMsg = styled.div`
// margin-left: 35px;

    height: 10%;
    width:100%;
    
    border: 0.5px solid silver;
    background-color: #F5F8FA;
`
const SwitchList = styled.div`
    ${centerAlign}
    justify-content: space-around;
    width: 100%;
    height: 9%;
    border: silver 0.5px solid;
`

const ItemList = styled.div`
    border:  0.5px solid silver; 
    overflow : scroll;
    display:grid; 
    //grid-gap: 4px; 
    grid-template-columns: ${(props) => props.grid ==="true" ? "1fr" : "1fr 1fr 1fr"};
    grid-template-rows: ${(props) => props.grid ==="true" ? "1fr" : "200px 200px 200px"};
  //  grid-template-columns: 1fr 1fr 1fr;     
  //  grid-template-rows: 200px 100px 100px; 
  //  align-items: center; 
  //  justify-content: space-around;
    width: 100%;
    height: 66%;
    /* ${centerAlign} */

    .private{
        ${centerAlign};
        background-color : "aliceblue";
        position : "absolute";
        left:"25%";
        bottom:"0";
        width: "50%";
        height:"60.5%";
        font-size:"30px";

        @media (max-width: 840px) {
            width: "50%";
            height:"60.5%";
            }
    }

   
`


 const CreateInfo = (props) => {
    return(
        <div className='info-name'>
            <p>{props.posts} {props.following} {props.follower}</p>
            <h5>{props.name}</h5>
        </div> 
    )
}

const Diary = (props) => {
    const Navi = useNavigate();

    return (
        <>     
        {
            props.data.map((e,idx)=> {
               return <img onClick={()=>{Navi(`/diary/detail/${e.id}`)}} key={idx} alt='' style={{width:"100%",height:"100%"}} src={e.itemList[0].timeLine.image}></img>
            })
        }
        </>
    );
}   

const TimeLine = (props) => {
   

    return (
        <>     
        {
            props.data.map((e,idx)=> {
               return <img key={idx} alt='' style={{width:"100%",height:"100%"}} src={e.image}></img>
            })
        }
        </>
    );
} 



function Profile() {
    const user = useContext(UserContext);
    const [state,setState] = useState(false);
    const [grid,setGrid] = useState(true);

    const [userData , setUserData] = useState([]);

    const [diaryData,setDiaryData] = useState([]);
    const [timeData,setTimeData] = useState([]);

    const [follower,setFollower] = useState([]);


    const { id } = useParams(); 

    let email = decodeURIComponent(id);

    useEffect(()=>{
       async function fetch () {

        const res = await CustomerApi.getCustomerInfoById((email));
        setDiaryData(res.data.customer.diaryList.filter(e=> e.delete !== true));
        setTimeData(res.data.customer.timeLineList);
        setUserData(res.data.customer);
        setFollower(res.data.follower);
        console.log(res.data.customer);
        console.log(res.data.customer.diaryList);
        }
        fetch();
        
    },[])
    
  return (
    <Container>
        <List>
            <Header>
                <div className='profile'>
                    <div className='profile-pic' >
                       <img alt='' src={userData.profilePic}></img>
                    </div>
                    <div className='profile-side'>
                        <div className='group'>
                             <div className='info'>
                                   <CreateInfo posts={diaryData.length+timeData.length} name={"게시물"}/>
                                   <CreateInfo follower={follower.follower} name={"팔로워"}/>
                                   <CreateInfo following={follower.following} name={"팔로잉"}/>                                         
                             </div>
                                <div style={{display:"flex",flexDirection:"row"}}>
                                <button style={{marginRight:"15px"}}>Follow</button>
                                <button>Message</button>
                                </div>
                                
                        </div>
                    </div>
                </div>
            </Header>
            <StatMsg>
                <p style={{marginTop:"5px",marginLeft:"35px"}}>{user.email}</p>
                <div style={{marginTop:"0px",marginLeft:"35px",display:"flex",justifyContent:"start",alignItems:"center"}}>
                    {userData.statMsg}
                </div>
            </StatMsg>
            <SwitchList>
                {grid ? <BsGrid3X3 onClick={()=> setGrid(false)}/> : <RiCheckboxBlankFill onClick={()=> setGrid(true)}/>}
                <GiNotebook onClick={()=>{setState(false)}}/>
                <RiMapPinTimeLine onClick={()=>{setState(true)}}/>   
            </SwitchList>


         <ItemList grid={grid.toString()}>
            {
          userData.openStatus === "PUBLIC" && state ?
           
            <TimeLine data={timeData}/>
            :
            <Diary data={diaryData}/>
            }
            {  
                    userData.openStatus !== "PUBLIC" &&
                  <div className='private' ><MdPersonOff></MdPersonOff>비공개 유저입니다.</div> 
                
            }

        </ItemList>
        
        </List>
    </Container>
    
  )
}

export default Profile