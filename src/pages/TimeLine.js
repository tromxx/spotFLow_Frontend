import styled , {css} from "styled-components";
import { TfiArrowLeft } from "react-icons/tfi";
import { useState } from "react";
import HeaderBar from "../components/HeaderBarNavi";
import { FiColumns } from "react-icons/fi";
import { RiLayoutRowLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import SearchBar from "../components/SearchBar";

const centerAlign = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;


const Container = styled.div`
    font-style: var(--kfont);
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
   
    width: 100vw;
    height: 100vh;
`
const Header = styled.div`
    background-color: white;
    height: 10%;
    width: 100%;
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
`

const Main = styled.div`
    overflow : scroll;
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: #d8d8d8;
    height: 90%;
    width: 100%;
    ${(props) => props.isSort ? `
        grid-template-columns: 1fr 1fr;
    ` : `
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    `}    
`;
const Item = styled.div`
    background-color: white ;
    //width: 50%;
    height: 300px;
    border-radius:15px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom:20px;
        &:first-child {
            margin-top : 20px;
        }
       
    ${(props) => props.isSort ? `
      ${centerAlign}
      flex-direction:column;
      &:nth-child(odd){
            margin-right:0px;
        }
         &:nth-child(2) {
            margin-top : 20px;
        } 
    ` : `
   
    flex-direction:row;
        display:flex;
       

    `}   

`
const ItemImg = styled.div`
     background-image: url(${(props) => props.url});
     background-repeat : no-repeat;
    background-size: cover;
       border-radius: 10px;

    ${(props) => props.isSort ? `
    
        height : 80%;
        width: 90%;
    ` : `
          margin-left: 30px;
          margin-bottom: 30px;
            margin-top: 30px;
            height : 80%;
            width: 50%;
    `}   




`
const ItemTitle = styled.div`

`

const ItemContent =styled.div`
   ${centerAlign}
    width: 50%;
    flex-direction:column;
     ${(props) => props.isSort ? `
      
    ` : `
    ${centerAlign}
    width: 100%;
    flex-direction:column;
    `} 


    

    .title{
        margin:10px;
        border-radius: 15px;
       ${centerAlign}
        background-color : #d8d8d8 ;
        width: 85%;
        flex: 1;

    }
    .content{
        margin:10px;
        border-radius: 15px;
        background-color: #d8d8d8;
        ${centerAlign}
        flex: 10;
        width : 85%;
    }
`




const TimeLine = () => {
    // 타임라인 리스트 정렬하기위한 변수
    const [isSort,setIsSort] = useState(false); 

    // 정렬하기위한 메서드  
    const toggleSwitch = () =>{
        setIsSort(!isSort);
    } 

    // dummy 임시로 테스트하려고 만든 객체배열 
    const dummy = [
        {
            id : 1,
            title: "역삼동 맛집",
            content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
            name : "안유진",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFjaZeCyw7uQ35A-m0mj--3p6--bnk1WOsA&usqp=CAU",
        },
        {
            id : 2,
            title: "강남역",
            content: "내가자주가",
            name : "이은지",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4Kelx6UY4EAmAxBKpECisZtK0MAxfCfo_w&usqp=CAU"
        },
        {   
            id : 3 ,
            title: "선릉역",
            content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
            name : "마마무",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOnMXfxlsIJPgeaFtQ_273EZrHFIDa2RizYg&usqp=CAU",
        },
        {   
            id : 4, 
            title: "ㅇㄹㅇ",
            name : "",
            image: "",
        },
        {
            id : 5,
            title: "역삼동 맛집",
            content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
            name : "안유진",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFjaZeCyw7uQ35A-m0mj--3p6--bnk1WOsA&usqp=CAU",
        },
        {
            id : 6,
            title: "역삼동 맛집",
            content: "노브랜드 버거 역삼역이랑 가까워서 자주가는곳",
            name : "안유진",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFjaZeCyw7uQ35A-m0mj--3p6--bnk1WOsA&usqp=CAU",
        },

];
    
    return(
        <>
<HeaderBar/>
        <Container>
            
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
                        <CreateBtn>
                         <AiOutlinePlus></AiOutlinePlus>
                        </CreateBtn>

                    </HeaderItemRight>
                   
                </HeaderList>

            </Header>
            <Main isSort={isSort}>
                {
                dummy.map((e)=> 
                    <Item isSort={isSort} key={e.id}>
                        <ItemImg isSort={isSort} url={e.image}></ItemImg>
                        <ItemContent>
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


