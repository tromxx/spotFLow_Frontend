import styled, {css} from "styled-components";
import {TfiArrowLeft} from "react-icons/tfi";
import {useState, useRef, useEffect} from "react";
import HeaderBar from "../components/HeaderBarNavi";
import {FiColumns} from "react-icons/fi";
import {RiLayoutRowLine} from "react-icons/ri";
import {AiOutlineCamera, AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiFillDelete} from "react-icons/ai";
import SearchBar from "../components/SearchBar";
import {MdOutlineEditOff} from "react-icons/md";
import {useTheme} from "../context/themeProvider";
import MainSlider from "../components/Slider";
import {Navigate, useNavigate} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import TimeLineModal from "../utils/TimeLineModal";

const ItemGrid = styled.div`
  display: grid;

  height: 80%;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  background-color: silver;


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

const Search = `
    
`;

const CreatePost = styled.div`
  background-color: white;
  ${centerAlign}
  flex-direction: column;
  width: 35%;
  height: 85%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);


  position: absolute;
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

  textarea {
    appearance: none; /* 기본 브라우저 스타일 제거 */
    outline: none; /* 아웃라인 제거 */
    border: none; /* 테두리 제거 */
    resize: none; /* 크기 조절 제거 */
    /* 이외 원하는 스타일을 적용 */
  }

    position: relative;
    top:60px;

  @media (min-width: 1300px) {
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
    height: 100vh;
    
 `   
const Header = styled.div`
  ${centerAlign}
  justify-content: start;
  flex-wrap: wrap;
  background-color: silver;
  height: 20%;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  Search-bar {
    @media (max-width: 850px) {
      & {width: 105%;}
    }
    width: 60%;
    padding: 15px;
    padding-left: 30px;
    height: 0px;
    margin-left: 20px;
    border:1px solid ${(props) => props.theme.timeLineBgColor};
    background-color: ${(props) => props.theme.timeLineBgColor};
    border-radius:15px;

  }
  @media (min-width: 1300px) {
    & {
      height: 20%;
      width: 72%;
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

   // overflow-y: scroll;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

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
      border: 1px solid silver;
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

  position: relative;
  background-color: white;
  //width: 50%;
  height: 300px;

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
        // &:nth-child(4n){
        //     margin-right:0px;
        // }
      &:nth-child(odd){
            margin-right:0px;
        } 
         &:nth-child(2) {
            margin-top : 20px;
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
	        }
        }


        @media (max-width: 850px) {
            & {
		        width: auto;
                height:190px;
	        }
        }
    ` : `
    height: 160px;
    flex-direction:row;
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
          margin-left: 30px;
           margin-bottom: 30px;
             margin-top: 10px;
            height : 140px;
            width: 30%;

            
    `}
`
const ItemTitle = styled.div`

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
  const [dummy, setDummy] = useState(
    [
      {
        id: 1,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/6d/23/89/6d2389ac0bbd5afe74a2633b872d14fc.jpg",
      },
      {
        id: 2,
        title: "강남역",
        content: "내가자주가",
        name: "이은지",
        image: "https://i.pinimg.com/474x/b3/91/3e/b3913eb2cfef207381eb28d8033229ba.jpg"
      },
      {
        id: 3,
        title: "선릉역",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "마마무",
        image: "https://i.pinimg.com/474x/39/03/d4/3903d4a7dfd82def0c1a825416a69853.jpg",
      },
      {
        id: 4,
        title: "ㅇㄹㅇ",
        name: "",
        image: "https://i.pinimg.com/474x/2b/f9/df/2bf9df9d3095b4b6c84a3e4cfb84ba11.jpg",
      },
      {
        id: 5,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/2b/dd/1f/2bdd1fcb3dc2b7f303f143f6395b69d7.jpg",
      },
      {
        id: 6,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },
      {
        id: 7,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 8,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },
      {
        id: 9,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 10,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 11,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 12,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 13,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 14,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },

      {
        id: 15,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      },
      {
        id: 16,
        title: "역삼동 맛집",
        content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
        name: "안유진",
        image: "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
      }]
  );
  // 무한스크롤 변수
  const [items, setItems] = useState(dummy.slice(0, 3));
  const [hasMore, setHasMore] = useState(true);
  const [height, setHeight] = useState(0);


    // 무한스크롤 가동 함수 콜백함수로 0.5초딜레이를 주고 moreitems에서 불러올 데이터수를 조절 
const fetchMoreData = () => {
    setTimeout(() => {
        if (items.length >= dummy.length ) {
            setHasMore(false);
            return;
        }
        const moreItems = dummy.slice(items.length, items.length + 2);
        setItems(prevItems => [...prevItems, ...moreItems]);

        window.scrollTo(0, document.body.scrollHeight);
    }, 500);

    

};
        
      


    // 모달 함수 
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);





    const Navi = useNavigate();
    // const input = useRef();
    // const content = useRef();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");


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

  // dummy 임시로 테스트하려고 만든 객체배열


  return (
    <>
      <HeaderBar/>

      <Container height={height} theme={theme}>
        {isCreate &&
          <CreatePost>
            <input style={{
              textAlign: "center",
              borderBottom: "1px solid silver",
              borderRadius: "0px",
              backgroundColor: "none"
            }} placeholder="Typing the Title" onChange={e => {
              setTitle(e.target.value)
            }} type="text"/>
            <textarea onChange={e => {
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
              <button onClick={() => {
                setDummy([...dummy, {title: title, content: content, image: selectedImage}]);
                setContent("");
                setTitle("")
              }}>확인
              </button>
              <button onClick={() => setIsCreate(!isCreate)}>취소</button>
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


              <CreateBtn onClick={deleteTimeLine}>
                <AiFillDelete></ AiFillDelete>
              </CreateBtn>


              {!isCreate &&

                <CreateBtn onClick={() => {
                  setIsEdit(!isEdit)
                }}>
                  {isEdit ? <MdOutlineEditOff/>
                    : <AiOutlineEdit onClick={() => {
                      setIsEdit(!isEdit)
                    }}></AiOutlineEdit>}

                </CreateBtn>


              }


            </HeaderItemRight>

          </HeaderList>
          <div style={{width: "70%", position: "relative"}}>
            <input type="text" className="Search-bar"
            /> <AiOutlineSearch style={{position: "absolute", left: "30px", bottom: "7px"}}/>
          </div>


            </Header>


            <Main isSort={isSort}>
                        
            <InfiniteScroll

            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            // loader={<h4>불러오는중..</h4>}
            endMessage={
              <p style={{textAlign: "center"}}>
                <b>끝페이지</b>
              </p>
            }
          >
            <ItemGrid isSort={isSort}>
              {
                items.map((e) =>

                    <Item isSort={isSort} key={e.id} onClick={openModal} >
                        {isEdit ?  

                      <CreateBtn isClicked={isClicked.includes(e.id)} onClick={() => {
                        setIsClicked(...isClicked, e.id)
                      }} className="editBtn"></CreateBtn>
                      : <></>}
                    <ItemImg isSort={isSort} url={e.image}></ItemImg>
                    <ItemContent isSort={isSort}>
                      <div className="title">{e.title}</div>
                      {isSort ? <></> : <div className="content">{e.content}</div>}

                    </ItemContent>
                  </Item>
                )
                }
                </ItemGrid>   
                  </InfiniteScroll>
                  </Main>
                    <CreateBtn style={{width:"100px", backgroundColor:"silver"}} onClick={fetchMoreData}>더보기</CreateBtn>
                    <TimeLineModal isOpen={isModalOpen} closeModal={closeModal}/>
        </Container>

        {/* <MainSlider name="Popular"/> */}
        </>


   
    );
            }

export default TimeLine;


