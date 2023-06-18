import styled from "styled-components";
import { TfiArrowLeft } from "react-icons/tfi";
import { useState } from "react";

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    width: 100vw;
    height: 100vh;
`
const Header = styled.div`
    background-color: white;
    height: 20%;
    width: 100%;
`
const Main = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: silver;
    height: 80%;
    width: 100%; 
    
    
`
const Item = styled.div`
    background-color: white ;
    /* width: 50%;
    height:50%; */
    margin: 5px;
`
const ItemImg = styled.div`
    background-repeat : no-repeat;
    background-size: cover;
    height : 80%;
    background-image: url(${(props) => props.url});
`
const ItemTitle = styled.div`

`

const ItemContent =styled.div`

`




const TimeLine = () => {
    const [isSort,setIsSort] = useState(false); 

    const toggleSwitch = () =>{
        setIsSort(!isSort);
    } 

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
            content: "명불허전",
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

];
    
    return(
        <Container>
            <Header>
                <TfiArrowLeft style={{backGroundColor:"silver", border:"1px solid", borderRadius: "15px" , fontSize:"30px" }}></TfiArrowLeft>
                <button onClick={toggleSwitch}>정렬</button>
            </Header>
            <Main isSort={isSort}>
                {
                dummy.map((e)=> 
                    <Item isSort={isSort} key={e.id}>{e.title}
                        <ItemImg isSort={isSort} url={e.image}></ItemImg>
                        <ItemContent>{e.content}</ItemContent>
                    </Item>
                )
                }
            </Main>
        </Container>
    );
}

export default TimeLine;


