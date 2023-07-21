import styled, {css} from "styled-components";
import {TfiArrowLeft} from "react-icons/tfi";
import {useState, useRef, useEffect} from "react";
import HeaderBar from "../components/HeaderBarNavi";
import {FiColumns} from "react-icons/fi";
import {RiLayoutRowLine} from "react-icons/ri";
import {AiOutlineCamera, AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiFillDelete} from "react-icons/ai";

import {MdOutlineEditOff, MdSecurityUpdateGood} from "react-icons/md";
import {useTheme} from "../context/themeProvider";
import default_avatar from '../images/default_avatar.png'
import { useNavigate} from "react-router-dom";

import TimeLineModal from "../utils/TimeLineModal";

import LoadingSpinner from "../components/LoadingSpinner";
import FlowModal from "../utils/FlowModal";
import { type } from "@testing-library/user-event/dist/type";
import userTimelineApi from "../api/UserTimelineApi";
import { useCallback } from "react";


const ItemGrid = styled.div`
  min-height: 80vh;
  display: grid;
  height: 80%;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  //background-color: white;


  @media (max-width: 850px) {
    ${(props) => props.isSort ? `
    grid-template-columns: 1fr 1fr;
` : `      
`}
  }
  // 삼항연산자안에서 미디어 쿼리 적용이 두가지 다되서 따로 분리함 !!
  ${(props) => props.isSort ? `
        grid-template-columns: 1fr 1fr 1fr 1fr;
}   

    ` : `
        grid-template-columns: 1fr ;
        grid-template-rows: 1fr 1fr  ;
    `}
`;


const centerAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreatePost = styled.div`
  position : fixed;
  top : 15%;
  background-color: white;
  ${centerAlign}
  flex-direction: column;
  width: 35%;
  height: 500px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
  z-index: 100;

  @media (max-width: 1000px) {
    & {
      width: 300px;
      height: 450px;
    }

    textarea {
      width: 82%;
    }
  }

  .create-btns {
    ${centerAlign}
    flex-direction: column;
    flex: 2;
    width: 100%;
  }

  button {
    margin: 10px;
    width: 48%;
    background-color: white;
    border: none;
    border-radius: 15px;
    height: 45px;
  }

  textarea {
    width: 85%;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px;
    flex: 6;
    border: none;
    background-color: white;
    border-radius: 15px;
  }

  input {

    padding: 10px;
    margin: 20px;
    flex: 0.3;
    border: none;
    border-radius: 15px;
    background-color: white;
    width: 83%;
    z-index: 50;

  }

  .button-box {

    position: relative;
    width: 100%;
    flex: 3;
    background-color: none;
  }

  .button-box-btn {
    border-radius: 25px;
  }

`;


const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor === "#171010" ? "black" : "white"};
  position:relative;
  .Name {
    margin-top:0px;
    
    color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "black"};
    font-family: var(--efont);
    font-size: 35px;
    font-weight: bolder;
    span {
      color: #00C2FA;
    }
  }

 

  textarea {
    appearance: none; /* 기본 브라우저 스타일 제거 */
    outline: none; /* 아웃라인 제거 */
    border: none; /* 테두리 제거 */
    resize: none; /* 크기 조절 제거 */
    /* 이외 원하는 스타일을 적용 */
  }

  @media (max-width: 850px) {
    & {
      
    }
  }

  * {
    font-family: 'Prompt', sans-serif;
    font-style: var(--kfont);
  }

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

   

    width: 100vw;
    min-height: 100vh;
    height:  auto;


    
 `   
const Header = styled.div`
  ${centerAlign}
  justify-content: start;
  flex-wrap: wrap;
  
 
  margin-top : 80px;

  
  background-color: ${(props) => props.theme.bgColor === '#171010' ? "#504C56" : "white"};
 // background-color: #A4EBF3;
  height: 20%;
  width: 100%;
  padding-bottom:20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .Search-bar {
    @media (max-width: 850px) {
      & {width: 105%;}
    }
    width: 60%;
    padding: 15px;
    padding-left: 30px;
    height: 0px;
    margin-left: 20px;
    border:none;
    
  //  border:1px solid ${(props) => props.theme.timeLineBgColor};
  background-color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "#F8F6F4"};

    border-radius:15px;

  }
  @media (min-width: 1300px) {
    & {
      height: 20%;
      width: 60.9%;
    }
  }
`
const HeaderList = styled.div`
  margin-top : 20px;
  display: flex;
  width: 100%;
`
const HeaderItemLeft = styled.div`
  margin: 10px;
  width: 50%;
`
const HeaderItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  width: 50%;
`
const CreateBtn = styled.div`

  /* display: flex;
  justify-content:center;
  align-items:center; */
  ${centerAlign}
 // border: 1px solid white;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "black"};
  background-color: ${(props) => props.theme.bgColor === '#171010' ? "#817D88" : "white"};
  
  margin: 5px;

  &:hover {
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "white" : "#2C2636"};
    color: ${(props) => props.theme.bgColor === '#171010' ? "black" : "white"};

  }

  ${(props) => props.isClicked &&
          `background-color: black; `
  }
`
const Main = styled.div`
    width: 100%;
    height: auto;
    background-color: ${(props) => props.theme.bgColor === '#171010' ? "#504C56" : "white"};
   // overflow-y: scroll;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  // 스크롤바 세팅 setTimeOut으로 시간지나면 없애는거 추후만들예정  
  /* &::-webkit-scrollbar {
    background-color: white;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background: #939393;
     outline: none;
  } */
  
  @media (min-width: 1300px) {
    & {
      height: 70%;
      width: 60.9%;
      //border: 1px solid silver;
    }
  }
         
  `
; 
const Item = styled.div`
transition: all 0.5s ease;

.item-header {
  ${centerAlign}
  justify-content: flex-start;
  height: 15%;
  width: 100%;
  background-color: #FCF9F9;
}

position: relative;
background-color: #FCF9F9;
align-items: center;
border-radius: 5px;
margin-left: 20px;
margin-right: 20px;
margin-bottom: 20px;

&:first-child {
  margin-top: 20px;
}

${(props) =>
  props.isSort
    ? `
  ${centerAlign}
  flex-direction: column;

  &:nth-child(even){
      margin-right: 20px;
  }

  &:first-child {
      margin-top: 40px;
      margin-bottom: 0px;
  }

  &:nth-child(odd) {
      margin-right: 0px;
  }

  &:nth-child(2) {
      margin-top: 40px;
      margin-bottom: 0px;
  }

  &:nth-child(3) {
      margin-top: 20px;
  }

  &:nth-child(4) {
      margin-top: 20px;
  }
  `
    : `
  &:first-child {
      margin-top: 40px;
      margin-bottom: 0px;
  }

  &:nth-child(2) {
      margin-top: 20px;
  }

  height: 500px;
  flex-direction: column;
  display: flex;
  `}

@media (min-width: 1300px) {
  ${(props) =>
    props.isSort
      ? `
    height: 250px;

    &:nth-child(even) {
        margin-right: 0px;
    }

    &:nth-child(4n) {
        margin-right: 20px;
    }

    &:nth-child(3), &:nth-child(4) {
        margin-top: 40px;
    }
    `
      : ``}
}

@media (max-width: 845px) {
  ${(props) =>
    props.isSort
      ? `
    width: auto;
    height: 150px;
    .item-header {
      height: auto;
    }

    `
      : `
    width: auto;
    height: auto;
    .item-header {
       height: 50px;
    }
    `}
}
;

    .editBtn {
        position: absolute;
        background-color:white;
        opacity: 80%;
        border: 1px solid silver;
        border-radius: 30px;
        top:0;
        left:0;
        &:hover {
            opacity: 100%;
            background-color:silver;
        }
    }

`
const ItemImg = styled.div`
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0px;
  background-position: center;
  background-color: silver;
  ${(props) => props.isSort ? `
        
        height : 80%;
        width: 90%;
    ` : `

        @media (max-width: 844px) {
            & {
		           width: 99%;
                height:150px;
                margin-left: 10px;
	        }
        }
          margin-left: 0px;
           margin-bottom: 10px;
         //    margin-top: 10px;
            height : 90%;
            width: 99%;

            
    `}
`
const ItemContent = styled.div`
  
  ${centerAlign}
  width: 100%;
  flex-direction: column;

  ${(props) => props.isSort ? `
      
    ` : `
    ${centerAlign}
    margin:20px;
    margin-left : 0;
    margin-right : 0;
    width: 100%;
    flex-direction:column;
    `}
  .title {
    margin: 10px;
    border-radius: 15px;
    ${centerAlign} // background-color:  ${(props) => props.theme.timeLineBgColor};
                    //  color : ${(props) => props.theme.textColor};
    width: 85%;
    flex: 1;
  }

  .content {
    margin: 10px;
    border-radius: 15px;
      //    background-color:  ${(props) => props.theme.timeLineBgColor};
      //    color : ${(props) => props.theme.textColor};
    ${centerAlign}
    flex: 10;
    width: 85%;
    overflow: scroll;
  }
`


const TimeLine = () => {
  const [dummy, setDummy] = useState([]);


  // []를 추가함으로써 이펙트는 한 번만 실행되며, 컴포넌트가 마운트 될 때만 실행됩니다.
  // 무한스크롤 변수[dummy.slice(0, 3));
  const [items, setItems] = useState([]);






// 모달데이터 설정
const [modalData, setModalData] = useState({ title: '', content: '' , name : '' , date:'' , profile: ''});      
      


    // 모달 함수 
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    //모달제어
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const  node = useRef(null); // 타임라인 모달에 전달해줄 ref
  const create = useRef(null); // 포스트생성 모달 ref


  // useEffect 와 ref를 이용하여 모달영역 밖 클릭시 닫을수 있도록 
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (isModalOpen && node.current &&!node.current.contains(e.target)) {
        closeModal();
      }
      
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  },[isModalOpen]);

    // 뒤로가기
    const Navi = useNavigate();
    // const input = useRef();
    // const content = useRef();


    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    // 색상모드 
    const theme = useTheme();


  // 파일선택하는 핸들링
  const fileInput = useRef();
  const handleOpenImageRef = () => {
    fileInput.current.click();
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file); // 파일 내용을 읽어옵니다.
    } else {
      setSelectedImage(null);  // 파일을 선택하지 않았을 경우 처리
    }
  }

  const deleteTimeLine = () => {
    if ((dummy.filter(i => !isClicked.includes(i.id)))) {
      setDummy(dummy.filter(i => !isClicked.includes(i.id)));
    }

    // setDummy(dummy.filter(e => e.id !== data.id ))
  }


  const [isClicked, setIsClicked] = useState([]);

  const [isCreate, setIsCreate] = useState(false);

  // 타임라인 리스트 정렬하기위한 변수
  const [isSort, setIsSort] = useState(false);

  // 편집모드를 위한 변수
  const [isEdit, setIsEdit] = useState(false);

  // 정렬하기위한 메서드
  const toggleSwitch = () => {
    setIsSort(!isSort);
  }
 
// 시간 계산 함수
  let [diffHours,setDiffHours] = useState();

     
      const calculateTime = (date) => {
        let date1 = new Date(date); // This is in local time
        let date2 = new Date();
        let diffMilliseconds = Math.abs(date2 - date1);
        let diffSeconds = Math.floor(diffMilliseconds / 1000);
        let diffMinutes = Math.floor(diffSeconds / 60);
        let diffHours = Math.floor(diffMinutes / 60);
        let diffDays = Math.floor(diffHours / 24);
        let diffTime; 
    
        if(diffDays > 0){
          diffTime = diffDays + "일 전"; 
        } else if(diffHours > 0) {
          diffTime = diffHours + "시간 전";
        } else if(diffMinutes > 0) {
          diffTime = diffMinutes + "분 전";
        } else {
          diffTime = diffSeconds + "초 전";
        }
    
        return diffTime;  // diffTime 반환
    } 
    

      // 모달 클릭시 날짜파싱해주는 함수
    function timeParse (time)  {
       let dateObj = new Date(time);
       let formattedDate = dateObj.toISOString().slice(0,19).replace("T"," ");
       return formattedDate;
    }  


  // 게시물 작성하기 조건 로직 ref  
    const titleRef = useRef();
    const contentRef = useRef();
    const [data,setData] = useState({
      title : "",
      image : "",
      email : "test@example.com",
      content : "" ,
      lat : null ,
      lng : null , 
      date : "" 
    })
    
    const CreatePostConfirm = async () => {
      if (contentRef.current.value.length < 5) {
        contentRef.current.focus();
        return;  
    }
    setData(prevState => ({
        ...prevState, 
        title: title, 
        content: content,
        image:  selectedImage
    }));
    userTimelineApi.setUserTimeline(data);
}


const handlePostClick = async (postId) => {
  try {
    await userTimelineApi.upView(postId);
    // 그 외 필요한 동작들...
  } catch (error) {
    console.error(error);
  }
}







      
      const [isCancel,setIsCancle] = useState(false);
      // 게시물 취소할때 내용이 한글자도있으면 window.confirm 



      const CreatePostCancle = () => {
  
        if (titleRef.current.value.length >= 1 || contentRef.current.value.length >=1) {
            setIsCancle(!isCancel);
        }  else setIsCreate(!isCreate);
    }

    const [search,setSearch] = useState('');

    //const filteredItems = items.filter(item => item.place.includes(search));

    // 디바운스 작업 필요 ?? 필터링 
//   const debounce = (func, delay) => {
//     let debounceTimer;
//     return function() {
//         const context = this;
//         const args = arguments;
//         clearTimeout(debounceTimer);
//         debounceTimer = setTimeout(() => func.apply(context, args), delay);
//     }
// }


  const obsRef = useRef(null); // observer Element
  const [page, setPage] = useState(1); //현재 페이지
  const preventRef = useRef(true); // Observer repeat execution prevention
  const endRef = useRef(false); // All posts loaded check
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태




  useEffect(()=> { // Observer creation
    const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
    if(obsRef.current) observer.observe(obsRef.current);
    return () => observer.disconnect();
  }, [])

  useEffect(()=> {
    fetchMoreData(items[items.length-1]?.id);
  }, [page])

  const obsHandler = ((entries) => { // Observer callback function
    const target = entries[0];
    if(!endRef.current && target.isIntersecting && preventRef.current){ // Observer repeat execution prevention
      preventRef.current = false; // Observer repeat execution prevention
      setPage(prev => prev +1);
    }
  })

  const fetchMoreData = useCallback(async(lastId) => { // Get more posts  
    setIsLoading(true);
  try {
    const res = await userTimelineApi.getUserTimelineList(lastId);
    if(res.data.length === 0){ // If there is no more posts
      endRef.current = true;
    }
    setTimeout(() => {
      setItems(prevItems => [...prevItems, ...res.data]); // Add new items to the list
      setIsLoading(false); // Stop loading after 1.5 seconds
      preventRef.current = true; // Allow observer to fetch more data again
    }, 1500);
  } catch (e) {
    setIsLoading(false);
    console.error(e);
  } 
  }, []);

    // 무한스크롤 하단 감시 변수 
    const target = useRef(null);
   
    
    const handleSearch = async () => {
        const res = await userTimelineApi.getTimePlace(search);
        console.log(res.data);
        setItems(res.data);
    }
  

  
  return (
    <>

      <HeaderBar />
      
      <Container   >
        {isCreate &&
        //     <FlowModal
        //     open={()=>setIsCreate(true)}
        //     close={()=>setIsCreate(false)}
        //     header={<div className="title">
        //     <span style={{ color: '#00B4D8' }}>F</span>low
        //     </div>}
        //     type="y"
        //     confirm={handleUploadImage}
        //     >
        //     <textarea className="flowArea" placeholder="나의 플로우를 공유해 보세요(90자 이내)"
        //       value={content}
        //       onChange={textLimit}
        //     />
        //     <p className="textLength">{flowModalText.length}/90</p>
        //     <div className="wrapper">
        //       <FileBox className="filebox">
        //         <div className="filebox">
        //             <label htmlFor="file"><AiOutlineCamera style={
        //               { width: "25px",
        //                 height: "25px",
        //                 color: theme.textColor}} />
        //             </label> 
        //             <input type="file" onChange={handleOpenImageRef} className="fileSelect" id="file"/>
        //             {thumbnailSrc !== "" && (
        //                 <img id="thumbnail" src={thumbnailSrc} alt="" className="thumbnail" />
        //             )}	
        //         </div>
        //       </FileBox>
        //       <div className="locationDiv">
        //         <label htmlFor="locationBtn" className="locationPin"><SlLocationPin /></label>
        //         <input type="text" value={locationValue} readOnly onClick={handleLocationModal} placeholder="위치 설정하기" className="locationInputBtn" id="locationBtn" />
        //       </div>
        //     </div>
        // </FlowModal>
          <CreatePost >
            <input ref={titleRef} style={{
              textAlign: "center",
              borderBottom: "1px solid silver",
              borderRadius: "0px",
              backgroundColor: "none"
            }} placeholder="Typing the Title" onChange={e => {
              setTitle(e.target.value)
            }} type="text"/>
            <textarea ref={contentRef} onChange={e => {
              setContent(e.target.value)
            }} name="" id="" cols="50" rows="30"></textarea>
            <div className="create-btns">
              {/* <CreateBtn className="create-btn">확인</CreateBtn>
                        <CreateBtn className="create-btn">취소</CreateBtn> */}
              <div style={{display: "flex", flexDirection: "row", width: "80%"}}>
                <div className="button-box" style={{width: "20%"}} onClick={handleOpenImageRef}>
                  <CreateBtn className="button-box-btn">
                    <AiOutlineCamera/>
                  </CreateBtn>
                  <input type="file" accept="image/jpeg, image/png" style={{display: "none"}} ref={fileInput}
                         onChange={handleUploadImage}/>
                </div>
                <div style={{width: "80%"}}>
                  <ul style={{display: "flex", flexDirection: "row", justifyContent: "start"}}>
                    <img src={selectedImage} alt="" style={{width: "50%", height: "50%;"}}/>
                  </ul>
                </div>
              </div>
             <div style={{width:"100%" ,flexDirection:"row"}}> 
                  <button style={{width:"50%"}} onClick={() => {
                    CreatePostConfirm();
                    
                  }}>확인
                  </button>
                  <button style={{width:"30%"}} onClick={() => CreatePostCancle()}>취소</button>
              </div>
            </div>

          </CreatePost>
        }
        <Header>
          <HeaderList>
            <HeaderItemLeft>
              <div style={{display:"flex",flexDirection:"row"}}>
                <CreateBtn onClick={() => {
                  Navi("/")
                }} style={{borderRadius: "8px"}}>
                  <TfiArrowLeft style={{fontSize: "20px" , marginTop:"7px"}}></TfiArrowLeft>
                </CreateBtn>
                <p style={{marginLeft:"15px"}} className="Name"><span>F</span>low</p>
              </div>
              <div style={{width: "70%", position: "relative"}}>
            <input type="text" className="Search-bar"  onChange={(e)=>{setSearch(e.target.value)}}
            /> <AiOutlineSearch onClick={handleSearch} style={{position: "absolute", left: "30px", bottom: "7px"}}/>

          </div>
            </HeaderItemLeft>
            
            <HeaderItemRight>
                <CreateBtn onClick={()=>{Navi('/myflow')}} style={{fontSize:"8px"}}>
                    MyFlow
                </CreateBtn>
              {isSort ?
                <CreateBtn>
                  <FiColumns style={{fontSize: "25px"}} onClick={toggleSwitch}/>
                </CreateBtn>

                :
                <CreateBtn>
                  <RiLayoutRowLine style={{fontSize: "25px"}} onClick={toggleSwitch}/>
                </CreateBtn>

              }
              <CreateBtn onClick={() => {
                setIsCreate(!isCreate)
              }}>
                <AiOutlinePlus></AiOutlinePlus>
              </CreateBtn>


            </HeaderItemRight>

          </HeaderList>
          


            </Header>


            <Main isSort={isSort}>
                        
            <div
           
            
          >
            <ItemGrid isSort={isSort}>
              { 
                items.map((e , index) =>
                    <Item isSort={isSort} key={e.id} onClick={()=>{
                      if(!isCreate){
                        handlePostClick(e.id);
                        setDiffHours(calculateTime(e.updateTime));
                        setModalData({ title: e.title, content: e.content , name : e.nickName , date: timeParse(e.updateTime) , profile: e.ct_profile_pic});
                        openModal()
                      }
                      }} >
                        {isEdit ?  

                      <CreateBtn isClicked={isClicked.includes(e.id)} onClick={() => {
                        setIsClicked(...isClicked, e.id)
                      }} className="editBtn"></CreateBtn>
                      : <></>}
                      <div className="item-header">
                      <img className="profile" style={
                              isSort
                              ? { margin: "10px", width: "30px", height:"30px", borderRadius:"25px" }
                              : { margin: "10px", width: "55px", height:"55px", borderRadius:"25px" }
                          }
                      src={ e.ct_profile_pic || default_avatar} alt="" />
                          <div style={{margin:"10px",height:"75%", display:"flex", flexDirection:"column",alignItems:"center"}}>
                              <div>{e.nickName}</div>
                            <p style={{fontSize:"10px"}}>{calculateTime(e.updateTime)}</p>
                            
                          </div>
                          <div style={{fontSize:"12px", position:"absolute",right:"10px"}}> {e.view} view</div>
                      </div>
                    <ItemImg  isSort={isSort} url={e.tl_profile_pic}></ItemImg>
                    {/* <ItemContent isSort={isSort}>
                      <div className="title">{e.title}</div>
                      {isSort ? <></> : <div className="content">{e.content}</div>}

                    </ItemContent> */}
                  </Item>
                )
                }
                </ItemGrid>   
                  </div>
                  <div ref={obsRef} style={{ width: '100%', height: 30, }}>{isLoading && <LoadingSpinner></LoadingSpinner>}</div>
                  </Main>
                    {/* <CreateBtn style={{width:"100px", backgroundColor:"silver"}} onClick={fetchMoreData}>더보기</CreateBtn> */}
                    <TimeLineModal isOpen={isModalOpen} closeModal={closeModal} setIsModalOpen={setIsModalOpen} ref={node} modalData={modalData} diffHours={diffHours} />
                    <FlowModal type={true} open={isCancel} confirm={()=>{setIsCancle(!isCancel); setIsCreate(!isCreate)}} close={()=>{setIsCancle(!isCancel)} }>작성중인 내용을 취소하겠습니까?</FlowModal>
        </Container>


        </>

    );
            }

export default TimeLine;


