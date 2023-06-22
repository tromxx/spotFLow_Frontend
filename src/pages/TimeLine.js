import styled , {css} from "styled-components";
import { TfiArrowLeft } from "react-icons/tfi";
import { useState , useRef ,useEffect } from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { FiColumns } from "react-icons/fi";
import { RiLayoutRowLine } from "react-icons/ri";
import { AiOutlineSearch,AiOutlinePlus ,AiOutlineEdit , AiFillDelete} from "react-icons/ai";
import SearchBar from "../components/SearchBar";
import {MdOutlineEditOff} from "react-icons/md";
import { useTheme } from "../context/themeProvider";
import MainSlider from "../components/SliderSample";


const centerAlign = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Search = `
    
`;

const CreatePost = styled.div`
    background-color: #E7F1F5;
    ${centerAlign}
    flex-direction: column;
    width : 35%;
    height: 85%; 


    position: absolute;
    border-radius: 15px;
    z-index: 100;
   

    @media (max-width: 1000px) {
	& {
		width: 300px;
        height:450px;
	}
   textarea {
     width: 82%;
   }
}


   
    .create-btns {
        
        ${centerAlign}
        flex-direction:column ;
        flex:2;
        width: 100%;
    }
    button {
        margin:10px;
        width: 48%;
        background-color: white;
        border:none;
        border-radius:15px;
        height: 45px;
    }
    textarea {
        width: 85%;
        margin-left:20px;
        margin-right:20px;
        padding: 10px;
        flex:6;
        border:none;
        background-color: white;
        border-radius:15px;
    }
    input { 
        padding: 10px;
        margin:20px;
        flex:1;
        border:none;
        border-radius:15px;
        background-color:white;
        width: 83%;

        
    }
    .button-box {

        position: relative;
        width: 100%;
        flex:3;
        background-color: none;
    }
    .button-box-btn {
        border-radius: 25px;
    }

`;


const Container = styled.div`
    position: relative;
    top:40px;

    @media (min-width: 1300px) {
	& {
        
    }
}


    font-family: var(--kfont);
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
   
    width: 100vw;
    height: 100vh;
`
const Header = styled.div`
    ${centerAlign}
    justify-content: start;
    flex-wrap: wrap;
    background-color: white;
    height: 10%;
    width: 100%;

    .Search-bar {
        width: 60%;
        padding: 15px;
        padding-left: 30px;
        height: 0px;
        margin-left: 20px;
        border:none;
        background-color: silver;
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
    display:flex;
    width : 100%;
`
const HeaderItemLeft =styled.div`
    margin: 10px;
    width: 50%;
`
const HeaderItemRight =styled.div`
    display:flex;
    justify-content: flex-end;
    margin: 10px;
    width: 50%;
`
const CreateBtn = styled.div`
    /* display: flex;
    justify-content:center;
    align-items:center; */
    ${centerAlign}
    border-radius: 5px;
    width: 35px;
    height: 35px;
    background-color: #d8d8d8;
    margin : 5px;
    &:hover{
        background-color: white;
        border: 1px solid silver;
    }
    ${(props) => props.isClicked && 
        `background-color: black; `
    }
`

const Main = styled.div`
     @media (min-width: 1300px) {
	& {

        height: 80%;
        width: 70%;
        border: 1px solid silver;

   
    }
} 
    overflow : scroll;
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color:  ${(props) => props.theme.timeLineBgColor};
    height: 90%;
    width: 100%;
    ${(props) => props.isSort ? `
        grid-template-columns: 1fr 1fr 1fr 1fr;

       
}   

    ` : `
        grid-template-columns: 1fr ;
        grid-template-rows: 1fr 1fr ;
    `}    
`;
const Item = styled.div`

    position: relative;
    background-color: white ;
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
    ${(props) => props.isSort ? `
      ${centerAlign}

      flex-direction:column;
      &:nth-child(2n){
            margin-right:0px;
        }
        &:nth-child(4n){
            margin-right:20px;
        }
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
    ` : `
    height: 160px;
    flex-direction:row;
        display:flex;      
        
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
     background-repeat : no-repeat;
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

const ItemContent =styled.div`
    
   ${centerAlign}
    width: 100%;
    flex-direction:column;
     ${(props) => props.isSort ? `

    ` : `
    ${centerAlign}
    margin:20px;
    margin-left : 0;
    margin-right : 0;
    width: 100%;
    flex-direction:column;
    `} 


    

    .title{
        margin:10px;
        border-radius: 15px;
       ${centerAlign}
      // background-color:  ${(props) => props.theme.timeLineBgColor};
     //  color : ${(props) => props.theme.textColor};
        width: 85%;
        flex: 1;

    }
    .content{
        margin:10px;
        border-radius: 15px;
    //    background-color:  ${(props) => props.theme.timeLineBgColor};
    //    color : ${(props) => props.theme.textColor};
        ${centerAlign}
        flex: 10;
        width : 85%;
    }
`




const TimeLine = () => {
    // const input = useRef();
    // const content = useRef();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");


    const theme = useTheme();

    const [dummy,setDummy] = useState(
        [
            {
                id : 1,
                title: "역삼동 맛집",
                content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
                name : "안유진",
                image : "https://i.pinimg.com/474x/6d/23/89/6d2389ac0bbd5afe74a2633b872d14fc.jpg",
            },
            {
                id : 2,
                title: "강남역",
                content: "내가자주가",
                name : "이은지",
                image: "https://i.pinimg.com/474x/b3/91/3e/b3913eb2cfef207381eb28d8033229ba.jpg"
            },
            {   
                id : 3 ,
                title: "선릉역",
                content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
                name : "마마무",
                image : "https://i.pinimg.com/474x/39/03/d4/3903d4a7dfd82def0c1a825416a69853.jpg",
            },
            {   
                id : 4, 
                title: "ㅇㄹㅇ",
                name : "",
                image: "https://i.pinimg.com/474x/2b/f9/df/2bf9df9d3095b4b6c84a3e4cfb84ba11.jpg",
            },
            {
                id : 5,
                title: "역삼동 맛집",
                content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
                name : "안유진",
                image : "https://i.pinimg.com/474x/2b/dd/1f/2bdd1fcb3dc2b7f303f143f6395b69d7.jpg",
            },
            {
                id : 6,
                title: "역삼동 맛집",
                content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
                name : "안유진",
                image : "https://i.pinimg.com/474x/10/fb/8e/10fb8e483838c860a06c6e8baf0a1aa1.jpg",
            },
    
    ]
    );


    const deleteTimeLine = () => {
        if((dummy.filter(i => !isClicked.includes(i.id)))){
            setDummy(dummy.filter(i => !isClicked.includes(i.id)));
        }

       // setDummy(dummy.filter(e => e.id !== data.id ))
    }
    const data = [];

    
    
    const [isClicked,setIsClicked] = useState([]);

   const [isCreate,setIsCreate] = useState(false);

    // 타임라인 리스트 정렬하기위한 변수
    const [isSort,setIsSort] = useState(false);
    
    // 편집모드를 위한 변수 
    const [isEdit,setIsEdit] = useState(false);

    // 정렬하기위한 메서드  
    const toggleSwitch = () =>{
        setIsSort(!isSort);
    } 

    // dummy 임시로 테스트하려고 만든 객체배열 
    
    
    return(
        <>
<HeaderBar/>

        <Container theme={theme}>
            {isCreate &&
                <CreatePost>
                    <input onChange={e=>{ setTitle(e.target.value)}} type="text" />
                    <textarea onChange={e=>{setContent(e.target.value)}} name="" id="" cols="50" rows="30"></textarea>
                    <div className="create-btns">
                       {/* <CreateBtn className="create-btn">확인</CreateBtn>
                        <CreateBtn className="create-btn">취소</CreateBtn> */}
                       <div className="button-box">
                            <CreateBtn className="button-box-btn"/>
                        </div> 
                        <button onClick={()=>{setDummy([...dummy, {title: title, content: content}]); setContent("");setTitle("")}}>확인</button>
                        <button onClick={()=>setIsCreate(!isCreate)}>취소</button>
                    </div>
                   
                </CreatePost>
            }
            <Header>
                <HeaderList>
                    <HeaderItemLeft>
                        <CreateBtn style={{borderRadius:"15px"}}>
                        <TfiArrowLeft style={{fontSize:"20px"}}></TfiArrowLeft>
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
                        <CreateBtn onClick={()=> {setIsCreate(!isCreate)}}>
                         <AiOutlinePlus></AiOutlinePlus>
                        </CreateBtn>
                        

                        <CreateBtn onClick={deleteTimeLine}>
                         <AiFillDelete></ AiFillDelete>
                        </CreateBtn>
                       
                        
                        {!isCreate &&
                        
                        <CreateBtn onClick={()=>{setIsEdit(!isEdit)}}>
                        {isEdit ? <MdOutlineEditOff />
                         : <AiOutlineEdit onClick={()=>{setIsEdit(!isEdit)}}></AiOutlineEdit>}
                        
                    </CreateBtn>
                        
                        
                        }
                       
                    

                    </HeaderItemRight>

                </HeaderList>
                <div  style={{width:"70%",position:"relative"}} >
                <input type="text" className="Search-bar" 
                /> <AiOutlineSearch style={{position: "absolute",left: "30px" , bottom:"7px"}}/>
                </div>
               

            </Header>
            <Main isSort={isSort}>
                {
                dummy.map((e)=> 
                    <Item isSort={isSort} key={e.id}>
                        {isEdit ?  

                        <CreateBtn isClicked={isClicked.includes(e.id)}  onClick={()=>{setIsClicked(...isClicked, e.id) }} className="editBtn"></CreateBtn>
                        : <></>}
                        <ItemImg isSort={isSort} url={e.image}></ItemImg>
                        <ItemContent isSort={isSort}>
                            <div className="title">{e.title}</div>
                            {isSort ?  <></> :  <div className="content">{e.content}</div>}
                           
                        </ItemContent>
                    </Item>
                )
                }
            </Main>
           
        </Container>
        </>

   
    );
}

export default TimeLine;


