import React, {useContext,useState,useEffect} from 'react'
import styled, {css} from 'styled-components'
import  { UserContext } from "../context/UserStore";

import {RiMapPinTimeLine,RiCheckboxBlankFill} from "react-icons/ri";
import {MdPersonOff} from "react-icons/md"
import {TfiArrowLeft} from "react-icons/tfi";
import { PiChatCenteredTextLight } from "react-icons/pi";
import {GiNotebook} from "react-icons/gi";
import userTimelineApi from '../api/UserTimelineApi';
import DiaryApi from '../api/DiaryApi';
import CustomerApi from '../api/CustomerApi';
import { useParams ,useNavigate} from 'react-router-dom';
import {IoArrowBackCircleOutline} from 'react-icons/io5'
import {BsGear,BsTrash,BsGrid3X3} from 'react-icons/bs'
import {BiEdit} from 'react-icons/bi'
import FlowModal from '../utils/FlowModal';



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

    .option {
        ${centerAlign}
        justify-content: space-evenly;
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
    .back {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 22px;
        @media (min-width: 1300px) {
               left: 300px;
               top:15px;
            }
    }
    .profile {
        ${centerAlign}
        width: 90%;
        margin-left: 20px;
        height: 100%;
            @media (max-width: 840px) {
                margin-left : 80px;
                width: 60%;
                margin-top:10px;
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
                    background-color: #46CFFA;
                    width: 130px;
                    height: 35px;
                    color:white;
                    border: none;
                    border-radius: 20px;
                   
                }
                .follow {
                        margin-right:30px;
                    }
                .message {
                    background-color: #DEE5E5;
                    color:black; 
                }
                @media (max-width: 840px) {
                        button{
                            width: 90px;
                        }
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
    position:relative;
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
const CheckBox = styled.div`
    position: absolute;
    top:0px;
    right: 0px;
    input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1.5px solid #999;
    appearance: none;
    cursor: pointer;
    background-color:white;
  }
  input[type="checkbox"]:checked {
    background:#46CFFA ;
    border: none;
  }
`
const Modal = styled.div`
    margin-top:20px;
    width:100%;
    height: 95%;
  //  border:1px solid;

    input {
        width: 90%;
        padding: 10px;
        border-radius: 15px;
        background-color:#FAFAFA;
        border: #EFEFEF 1px solid;
        border-radius: 6px;
    
    }
    
    textarea {
        padding: 10px;
        margin-top: 10px;
        width:  90%;
        height: 55%;
        border-radius:15px;
        background-color:#FAFAFA;
        border: #EFEFEF 1px solid;
        border-radius: 6px;
        padding-left: 10px;
    }
    .flow {
     //   border:1px solid;
        width: 95%;
        height: 25%;
        margin-left: 15px;


        ${centerAlign};
        justify-content: space-around;
        overflow: auto;
        @media (max-width: 840px) {
           margin-left: 13px;
         }
    }
    .item {
        position:relative;
        flex-shrink: 0;
        ${centerAlign};
        border: 1px solid;
        width: 50%;
        height: 95%;
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

const Diary = ({ setSelectedDiaryToEdit, selectedDiaryToEdit, data, isDelete, isEdit, handleCheckboxChange, selectedDiaries, setSelectedDiaries }) => {
    const Navi = useNavigate();
    return (
      <>
        {
          data.map((e, idx) => {
            // itemList[0]의 존재 여부를 검사
            const imageUrl = e.itemList && e.itemList[0] && e.itemList[0].timeLine ? e.itemList[0].timeLine.image : '';
            return (
              <div style={{ position: "relative" }} key={idx}>
                <img onClick={() => { Navi(`/diary/detail/${e.id}`) }} key={idx} alt='' style={{ width: "100%", height: "100%" }} src={imageUrl}></img>
                <CheckBox key={e.id + '-delete'}>
                  {isDelete && <input className='delete' type="checkbox" name="" id=""
                    checked={selectedDiaries.includes(e.id)}
                    onChange={(event) => handleCheckboxChange(e.id, event.target.checked)}
                  />}
                </CheckBox>
                <CheckBox key={e.id + '-edit'}>
                  {isEdit &&
                    <input
                      className='edit'
                      type="radio"
                      name="id"
                      id="id"
                      checked={selectedDiaryToEdit === e.id}
                      onChange={() => setSelectedDiaryToEdit(e.id)}
                    />
                  }
                </CheckBox>
              </div>
            );
          })
        }
      </>
    );
  };

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
    const [grid,setGrid] = useState(false);

    const [userData , setUserData] = useState([]);

    const [diaryData,setDiaryData] = useState([]);
    const [timeData,setTimeData] = useState([]);

    const [follower,setFollower] = useState([]);
    const Navi = useNavigate();

    const [option,setOption] = useState(false);

    const [isEdit,setIsEdit] = useState(false);
    const [isDelete,setIsDelete] = useState(false);

    const [selectedDiaryToEdit, setSelectedDiaryToEdit] = useState(null);

    // 완료되면 재렌더링 
    const [Change,setChange] = useState(false);

    const { id } = useParams(); 

    const [myEmail,setMyEmail] = useState("");
    

    let email = decodeURIComponent(id);

    const [selectedDiaries, setSelectedDiaries] = useState([]);

    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setSelectedDiaries([...selectedDiaries, id]);
        } else {
            setSelectedDiaries(selectedDiaries.filter(diaryId => diaryId !== id));
        }
    };

    const handleDelete = async () => {

        await DiaryApi.deleteDiarys({ id: selectedDiaries });
        setChange(!Change);
        setIsDelete(!isDelete); 
        setIsEdit(false)
        setSelectedDiaries([]);
    };

    useEffect(()=>{
       async function fetch () {
        const token = localStorage.getItem("authToken");
        const res = await CustomerApi.getCustomerInfoById((email));
        setDiaryData(res.data.customer.diaryList.filter(e=> e.delete !== true));
        setTimeData(res.data.customer.timeLineList);
        setUserData(res.data.customer);
        setFollower(res.data.follower);


        const ress = await CustomerApi.getCustomerInfo(token);
        setMyEmail(ress.data.customer.email);


        }
        fetch();
        console.log(user.email);
        
    },[Change])

    const [isModal,setIsModal] = useState(false);


    const [flow,setFlow] = useState([]);

    const [timeLine,setTimeLine] = useState([]);

    async function fetchFlow () {
        const res = await userTimelineApi.getUserTimelineList(0);
          setFlow(res.data);

          const res2 = await userTimelineApi.getUserTimelineLists();
          setTimeLine(res2.data);

          console.log(res2.data);
        }
    

    useEffect(() => {
        if (isModal) {
          fetchFlow();
        }
        else {
            setFlow([]);
        }
      }, [isModal]);



      const [isTimeLine,setIsTimeLine] = useState(false);
     
      const [contents,setContent] = useState("");
      const [titles,setTitle] = useState("");

      const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(null);


      async function confirm() {
        // id, title, content, timeLineList를 가져옵니다.
        const id = selectedDiaryToEdit;
        const title = titles; // 사용자가 입력한 제목
        const content = contents; // 사용자가 입력한 내용
      
        // 다이어리의 타임라인 리스트를 가져옵니다.
        const timeLineList = diaryData.find(diary => diary.id === id).itemList.map(item => ({
          id: item.timeLine.id,
          // 필요한 다른 필드들을 여기에 추가합니다.
        }));
      
        // 요청 본문을 만듭니다.
        const diaryUpdateRequest = {
          id,
          title,
          content,
          timeLineList,
        };
      
        try {
          // PUT 요청을 보냅니다.
          const response = await DiaryApi.updateMyDiary(diaryUpdateRequest);
          const updatedDiary = response.data;
          // 상태를 업데이트합니다.
          setDiaryData(prevDiaryData => prevDiaryData.map(diary => diary.id === id ? updatedDiary : diary));
          setIsModal(false);
        } catch (error) {
          console.error("Error updating diary:", error);
        }
      }
      const handleTimelineSelection = (selectedTimelineItem) => {
        console.log("Function called with item:", selectedTimelineItem);
        console.log("selectedDiaryToEdit:", selectedDiaryToEdit);
        console.log("selectedTimelineIndex:", selectedTimelineIndex);
        if (selectedDiaryToEdit !== null && selectedTimelineIndex !== null) {
          setDiaryData(prevDiary => {
            const newDiary = [...prevDiary];
            const selectedDiary = newDiary.find(diary => diary.id === selectedDiaryToEdit);
            if (selectedDiary && selectedDiary.itemList && selectedDiary.itemList[selectedTimelineIndex]) {
              selectedDiary.itemList[selectedTimelineIndex].timeLine.image = selectedTimelineItem.tl_profile_pic; // 이미지 교체
            }
            return newDiary;
          });
          setIsTimeLine(false); // 모달 닫기
        }
      };
      

  return (
    <Container>
        <List>
            <Header>
                <IoArrowBackCircleOutline onClick={()=>{Navi(-1)}} className='back'/>
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
                             {myEmail  === id ? 
                             
                             <div className='option'>
                                <BsGear onClick={()=>{setOption(!option);  }}/>
                                {option &&  <BiEdit onClick={()=>{
                                    if(selectedDiaryToEdit !== null) {
                                        setIsModal(true);
                                    }
                                    setIsEdit(!isEdit); setIsDelete(false)}}/> } 
                                {option &&  <BsTrash onClick={()=>{
                                    if(selectedDiaries.length >= 1){
                                        handleDelete();
                                }  else {
                                    setIsDelete(!isDelete);
                                    setIsEdit(false);
                                }         
                                }}/>}
                             </div>

          

                             :
                             <div style={{display:"flex",flexDirection:"row"}}>
                             <button className='follow'>팔로우하기</button>
                             <button className='message' onClick={()=>{Navi(`/chat/${id}/${myEmail}`)}}>메세지보내기</button>
                             </div>
                             }
                            
                                
                        </div>
                    </div>
                </div>
            </Header>
            <StatMsg>
                <p style={{marginTop:"5px",marginLeft:"35px"}}>{userData.nickName}</p>
                <div style={{marginTop:"0px",marginLeft:"35px",display:"flex",justifyContent:"start",alignItems:"center"}}>
                    {userData.statMsg }
                </div>
            </StatMsg>
            <SwitchList>
                {grid ? <BsGrid3X3 onClick={()=> setGrid(false)}/> : <RiCheckboxBlankFill onClick={()=> setGrid(true)}/>}
                <GiNotebook onClick={()=>{setState(false)}}/>
                <RiMapPinTimeLine onClick={()=>{setState(true)}}/>   
            </SwitchList>


         <ItemList grid={grid.toString()}>
            {
           state ?
           
            <TimeLine data={timeData}/>
            :
            <Diary setSelectedTimelineIndex={setSelectedTimelineIndex} setSelectedDiaryToEdit={setSelectedDiaryToEdit} selectedDiaryToEdit={selectedDiaryToEdit} selectedDiaries={selectedDiaries} setSelectedDiaries={setSelectedDiaries} handleCheckboxChange={handleCheckboxChange} isDelete={isDelete} isEdit={isEdit} data={diaryData}/>
            }
        

        </ItemList>
       
        </List>

        <FlowModal confirm={()=>{confirm()}} flow={flow} open={isModal} type ={true} close={()=>{setIsModal(false); setSelectedDiaryToEdit(null)}}>
  <Modal>
    <input onChange={(e)=>{setTitle(e.target.value)}} value={titles} type={"text"}></input>
    <textarea onChange={(e)=>{setContent(e.target.value)}} value={contents} style={{resize: "none"}} name="" id="" cols="30" rows="15"></textarea>
    {/* <div className='flow' >
      {
        diaryData.filter(diary => diary.id === selectedDiaryToEdit).map(diary => {
          return diary.itemList.map((item, idx) => {
            return (
              <div key={item.timeLine.id} >
                <div style={{width:"100%", position:"relative"}}>
                <img   style={{width:"100px",height:"100%"}} src={item.timeLine.image} alt="" onClick={() => {

                  setDiaryData(prevDiary => {
                    const newDiary = [...prevDiary];  // Copy the current state
                    const selectedDiary = newDiary.find(diary => diary.id === selectedDiaryToEdit);  // Find the diary being edited
                    selectedDiary.itemList[idx].timeLine = item.timeLine;  // Replace the timeline item with the selected one
                    return newDiary;
                  });
                  setIsTimeLine(false);
                }}
                />
                    <button onClick={()=>{setIsTimeLine(true)}} style={{top:"0px",right:"0px",position:"absolute",width:"10px",borderRadius:"15px",height:"15px"}}></button>
                </div>
              </div>
            );
          });
        })
      }
    </div> */}
  </Modal>
</FlowModal>



         {/* <FlowModal open={isTimeLine} close={()=>{setIsTimeLine(false)}}>
            <main  style={{overflow:"auto",border:"1px solid",width:"100%",height:"90%"}}>
            {
  timeLine.map((timeLineItem, idx) => {
    return (
        <img 
        alt='' 
        style={{width:"95%",height:"50%"}} 
        src={timeLineItem.tl_profile_pic}
        onClick={() => {
            setIsTimeLine(false);

        }}
    ></img>
    ); 
  })
  
}

            </main>
         </FlowModal> */}


<FlowModal open={isTimeLine} close={() => { setIsTimeLine(false) }}>
  <main style={{ overflow: "auto", border: "1px solid", width: "100%", height: "90%" }}>
    {
      timeLine.map(e => {
        return (
          <img alt='' style={{ width: "95%", height: "50%" }} src={e.tl_profile_pic}
            onClick={() => handleTimelineSelection(e)} // 여기서 호출합니다.
          ></img>
        );
      })
    }
  </main>
</FlowModal>



    </Container>
   
    
  )
}

export default Profile;


