import styled, {css} from "styled-components";
import {TfiArrowLeft} from "react-icons/tfi";
import {useState, useRef, useEffect} from "react";
import HeaderBar from "../components/HeaderBarNavi";
import {FiColumns} from "react-icons/fi";
import {RiLayoutRowLine} from "react-icons/ri";
import {AiOutlineCamera, AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiFillDelete} from "react-icons/ai";

import {MdOutlineEditOff} from "react-icons/md";
import {useTheme} from "../context/themeProvider";
import default_avatar from '../images/default_avatar.png'
import { useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import TimeLineModal from "../utils/TimeLineModal";
import dummy2 from "../dataSet/TimeLineData";
import LoadingSpinner from "../components/LoadingSpinner";
import FlowModal from "../utils/FlowModal";
import { type } from "@testing-library/user-event/dist/type";
import userTimelineApi from "../api/UserTimelineApi";

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

  background-color: ${(props) => props.theme.timeLineBgColor};
  background-color:white;
  textarea {
    appearance: none; /* 기본 브라우저 스타일 제거 */
    outline: none; /* 아웃라인 제거 */
    border: none; /* 테두리 제거 */
    resize: none; /* 크기 조절 제거 */
    /* 이외 원하는 스타일을 적용 */
  }

    position: relative;
    top:40px;

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
  
  background-color: white;
  background-color: ${(props) => props.theme.bgColor};
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
    background-color: white;

    border-radius:15px;

  }
  @media (min-width: 1300px) {
    & {
      height: 20%;
      width: 71.9%;
    }
  }
`
const HeaderList = styled.div`
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
  border: 1px solid white;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  color: black;
  background-color: ${(props) => props.theme.timeLineBgColor};
  background-color: white;
  margin: 5px;

  &:hover {
    background-color: white;
    border: 1px solid silver;
  }

  ${(props) => props.isClicked &&
          `background-color: black; `
  }
`
const Main = styled.div`

    width: 100%;
    height: auto;

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
      width: 71.9%;
      //border: 1px solid silver;
    }
  }
          // overflow : scroll;
            /* display: grid;
    grid-template-rows: 1fr 1fr;
    background-color:  silver;
    height: 80%;
    width: 100%;

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
        `}  */
  `
;


const Item = styled.div`
    transition: all 0.5s ease;
    .item-header {
      ${centerAlign}
      justify-content:flex-start;
      height: 15%;
      width: 100%;

      background-color: white;
    }
  
  position: relative;
  background-color: #FCF9F9;
  //width: 50%;
  height: 300px;
    align-items:center;
    border-radius:5px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom:20px;
        &:first-child {
            margin-top : 20px;
        }
       // 밑에 코드는 정렬 
    ${(props) => props.isSort ?`
       ${centerAlign}
      flex-direction:column;
      &:nth-child(even){
            margin-right:20px;

        }
        &:first-child {
            margin-top : 40px;
            margin-bottom: 0px;
  
        } 
    
        // &:nth-child(4n){
        //     margin-right:0px;
        // }
      &:nth-child(odd){
            margin-right:0px;
        } 
         &:nth-child(2) {
            margin-top : 40px;
            margin-bottom: 0px;
  
        } 
        &:nth-child(3) {

          margin-top : 20px;
          } 
          &:nth-child(4) {
          margin-top : 20px;
          } 

        @media (min-width: 1300px) {
            & {
		        &:nth-child(even){
                    margin-right:0px;

                }
                &:nth-child(4n){
                    margin-right:20px;
                    }
               &:nth-child(3) {

                 margin-top : 40px;
                } 
                &:nth-child(4) {
                 margin-top : 40px;
                }       
	        }
        }


        @media (max-width: 844px) {
            & {
		        width: auto;
                height:190px;
	        }
        }
    ` : `
    &:first-child {
            margin-top : 40px;
            margin-bottom: 0px;
  
        } 
    &:nth-child(2) {
            margin-top : 20px;
  
        } 
    height: 500px;
    flex-direction:column;
    display:flex; 
    @media (max-width: 850px) {
            & {

		        width: auto;
	        }
        }
        
    `}  
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
		           width: 100%;
                height:150px;
                margin-left: 10px;
	        }
        }
          margin-left: 0px;
           margin-bottom: 10px;
         //    margin-top: 10px;
            height : 90%;
            width: 100%;

            
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
  const [dummy, setDummy] = useState(dummy2);


  useEffect(() => {
    const fetchData = async () => {
      const res = await userTimelineApi.getUserTimelineList();
        setDummy(res.data);
    };
    fetchData();
  }, []);  
  
  
  // []를 추가함으로써 이펙트는 한 번만 실행되며, 컴포넌트가 마운트 될 때만 실행됩니다.
  // 무한스크롤 변수[dummy.slice(0, 3));
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);



    // 무한스크롤 가동 함수 콜백함수로 1.5초딜레이를 주고 moreitems에서 불러올 데이터수를 조절 
    // 로딩상태변수
    const [isLoading, setIsLoading] = useState(false);
// const fetchMoreData = () => {
 
//     setTimeout(() => {
     
//         if (items.length >= dummy.length ) {
//             setHasMore(false);
//             return;
//         }
//         setIsLoading(true);
//         const moreItems = dummy.slice(items.length, items.length + 2);
//         setItems(prevItems => [...prevItems, ...moreItems]);

      
//     }, 1500);
//     setIsLoading(!isLoading);
// };
const fetchMoreData = () => {
  if (!dummy) {
    return;
  }

  setTimeout(() => {
    if (items.length >= dummy.length) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    const moreItems = dummy.slice(items.length, items.length + 2);
    setItems(prevItems => [...prevItems, ...moreItems]);
  }, 1500);
  
  setIsLoading(!isLoading);
};

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

        if(diffDays > 0){
          setDiffHours(diffDays + "일 전"); 
        } else if(diffHours > 0) {
          setDiffHours(diffHours + "시간 전");
        } else if(diffMinutes > 0) {
          setDiffHours(diffMinutes + "분 전");
        } else {
          setDiffHours(diffSeconds + "초 전");
        }
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


// useEffect(() => {
//   if(data.title !== "" && data.content !== ""){
//     userTimelineApi.setUserTimeline(data);
//       setContent("");
//       setTitle("")
//       setIsCreate(!isCreate);
//   }
// }, [data]); // data 상태가 변경될 때마다 이 useEffect는 호출됩니다.









      
      const [isCancel,setIsCancle] = useState(false);
      // 게시물 취소할때 내용이 한글자도있으면 window.confirm 



      const CreatePostCancle = () => {
  
        if (titleRef.current.value.length >= 1 || contentRef.current.value.length >=1) {
            setIsCancle(!isCancel);
        }  else setIsCreate(!isCreate);
    }



  return (
    <>

      <HeaderBar />

      <Container   theme={theme}>
        {isCreate &&
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
              <CreateBtn onClick={() => {
                Navi(-1)
              }} style={{borderRadius: "15px"}}>
                <TfiArrowLeft style={{fontSize: "20px"}}></TfiArrowLeft>
              </CreateBtn>
              <div style={{width: "70%", position: "relative"}}>
            <input type="text" className="Search-bar"
            /> <AiOutlineSearch style={{position: "absolute", left: "30px", bottom: "7px"}}/>
            
          </div>
            </HeaderItemLeft>
            
            <HeaderItemRight>
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


              {/* <CreateBtn onClick={deleteTimeLine}>
                <AiFillDelete></ AiFillDelete>
              </CreateBtn> */}


                 {/* 수정 버튼 없애버림 */}
              {/* {!isCreate &&

                <CreateBtn onClick={() => {
                  setIsEdit(!isEdit)
                }}>
                  {isEdit ? <MdOutlineEditOff/>
                    : <AiOutlineEdit onClick={() => {
                      setIsEdit(!isEdit)
                    }}></AiOutlineEdit>}

                </CreateBtn>


              } */}


            </HeaderItemRight>

          </HeaderList>
          


            </Header>


            <Main isSort={isSort}>
                        
            <InfiniteScroll

            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            // 잠시제거 loader={isLoading ? <LoadingSpinner/> : null}
            endMessage={
              <p style={{textAlign: "center"}}>
                {/* <b>끝페이지</b> */}
              </p>
            }
            
          >
            <ItemGrid isSort={isSort}>
              {
                items.map((e) =>
                  
                    <Item isSort={isSort} key={e.id} onClick={()=>{
                      if(!isCreate){
                        calculateTime(e.updateTime);
                        setModalData({ title: e.title, content: e.content , name : e.nickName , date: e.updateTime , profile: e.ct_profile_pic});
                        openModal()
                      }
                      }} >
                        {isEdit ?  

                      <CreateBtn isClicked={isClicked.includes(e.id)} onClick={() => {
                        setIsClicked(...isClicked, e.id)
                      }} className="editBtn"></CreateBtn>
                      : <></>}
                      <div className="item-header">
                          <img style={{margin:"10px",width: "55px", height:"55px", borderRadius:"25px"}} src={ e.ct_profile_pic || default_avatar} alt="" />
                          <div>{e.nickName}</div>
                          <div style={{fontSize:"12px", position:"absolute",right:"0"}}> {e.view} view</div>
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
                  </InfiniteScroll>
                  </Main>
                    {/* <CreateBtn style={{width:"100px", backgroundColor:"silver"}} onClick={fetchMoreData}>더보기</CreateBtn> */}
                    <TimeLineModal isOpen={isModalOpen} closeModal={closeModal} setIsModalOpen={setIsModalOpen} ref={node} modalData={modalData} diffHours={diffHours} />
                    <FlowModal type={true} open={isCancel} confirm={()=>{setIsCancle(!isCancel); setIsCreate(!isCreate)}} close={()=>{setIsCancle(!isCancel)} }>작성중인 내용을 취소하겠습니까?</FlowModal>
        </Container>

        {/* <MainSlider name="Popular"/> */}
        </>

    );
            }

export default TimeLine;


