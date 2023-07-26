import React from 'react'
import styled, {css} from 'styled-components'
import DiaryModal from '../utils/DiaryModal'
import {TfiArrowLeft} from "react-icons/tfi";
import profile from '../images/default_avatar.png'
import {AiOutlinePlus} from "react-icons/ai";
import {MdCancel, MdPostAdd} from "react-icons/md";
import {useState, useRef , useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import DiaryApi from "../api/DiaryApi";
import { UserContext} from '../context/UserStore';



const centerAlign = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CreateBtn = styled.div`
  ${centerAlign}
  border: none;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  color: black;
  background-color: ${(props) => props.theme.timeLineBgColor};
  background-color: #d9d9d9;

  margin: 15px;


`

const TopMenu = styled.div`
  @media (max-width: 850px) {
    & {
      width: 100%;
    }
  }

  background-color: white;
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 10%;
  // border : solid 1px black;

  .menu {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .left {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: start;
  }

  .right {
    display: flex;
    justify-content: end;
    width: 50%;
    align-items: center;
  }
`

const Main = styled.div`
  @media (max-width: 850px) {
    & {
      width: 99%;
      height: 100%;
    }
  }
  background-color: white;
  width: 60%;
  height: 90%;
  // border : solid 1px black;


  .Container {
    //  border : 1px solid ;
    height: 90%;
    margin: 30px;
    margin-top: 10px;

  }

  .user {
    background-color: white;
    ${centerAlign}
    flex-direction: row;
    justify-content: start;
    //  border : 1px solid ;
    height: 15%;
    margin: 10px;

    .user-info {
      width: 100%;
    }
  }

  .title {
    //   border : 1px solid ;
    height: 10%;
    margin: 10px;
    margin-bottom: 15px;


    input {
      background-color: #F0F0F0;
      padding: 10px;
      box-sizing: border-box;
      outline: none;
    }
  }

  .content {
    border: 1px solid #d9d9d9;

    @media (max-width: 850px) {
      & {
        height: 40%;

      }

      border: .5px solid #d9d9d9;

    }

    //   border : 1px solid ;
    height: 55%;
    margin: 10px;


    textarea {
      @media (max-width: 850px) {
        & {
          height: 100%;
        }
      }
      width: 100%; // or any custom value
      height: 100%; // or any custom value
      padding: 20px;
      box-sizing: border-box;
      background-color: #F9F9F9;
      border: none;
      resize: none;
      outline: none;
      //  padding: 10px ;
      margin: 0;
    }
  }

  .add-list {
    ${centerAlign}
    justify-content: start;

    // border : 1px solid ;
    height: 18%;
    margin: 10px;
    box-sizing: border-box;
    width: 97.5%;
    @media (max-width: 850px) {
      & {
        width: 94%;
      }
    }


    .list-box {
      ${centerAlign} // Changed from flex to grid


      overflow-x: auto;
      width: 80%;
      height: 80%;
      margin: 10px;
      margin-right: 0px;
      // border:1px solid;
      justify-content: flex-start;


    }

    .item {
      @media (max-width: 850px) {
        & {
          width: 35%;
        }
      }
      background-color: white;
      ${centerAlign}
      position: relative;
      flex-direction: row;
      width: 150px;
      // border:1px solid;
      height: 70px;
      max-width: 150px;
      min-width: 20%;
      margin: 10px;
    }


    .button {
      position: absolute;
      top: 0;
      right: 0;
      width: 1rem;
      height: 1rem;

      appearance: none;
      cursor: pointer;
      transition: ease 0.2s;
      
    }

    button:hover {
      background: lightblue;
      border: none;
    }
  }
`

const Container = styled.div`

  background-color: #F9F6F7;
  ${centerAlign}
  flex-direction: column;
  position: relative;
    top: 50px;
 // top: 51px;
  // border : solid 1px black;
  width: 100vw;
  height: 92vh;
`

function DiaryCreate() {
  const navi = useNavigate();
  const [isCreate, setIsCreate] = useState(false);

  const [timeline, setTimeLine] = useState([]);

  const title = useRef(null);
  const text = useRef(null);

  const [diaryPost, setDiaryPost] = useState({id: [], title: "", content: ""});


  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth는 0부터 11까지를 반환하므로 1을 더해줍니다.
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const user = useContext(UserContext);

  const handlePost = (title, text) => {
    if (title.current.value.length < 1) {
      title.current.focus();
      title.current.placeholder = "1글자 이상 입력해주세요"
      return
    }
    if (text.current.value.length < 1) {
      text.current.focus();
      text.current.placeholder = "1글자 이상 입력해주세요"
      return
    }
    // const images = timeline.map(item => item.image);
    const newDiaryPost = {
      ...diaryPost,
      title: title.current.value,

      content: text.current.value,
      timeline : timeline  
    };
    setDiaryPost(newDiaryPost);
    console.log(timeline);
   const sss = DiaryApi.saveDiary(user.email, title.current.value, text.current.value, timeline);
    console.log(sss.data);

    navi("/diaryMypage");
    
  }

  const handleCreate = (newItems) => {
    setIsCreate(!isCreate);

    if (newItems) {
      setTimeLine([...timeline, ...newItems.map(item => ({id: item.id, image: item.image}))]);
    }
};


  const handleDelete = (itemToRemove) => {
    setTimeLine(prevTimeLine => prevTimeLine.filter(item => item.id !== itemToRemove.id))
  }


  return (
    <Container>
      <TopMenu>
        <div className='menu'>
          <div onClick={()=>navi(-1)} className='left'><CreateBtn style={{borderRadius: "20px"}}> <TfiArrowLeft/> </CreateBtn></div>
          <div className='right'><CreateBtn style={{width: "60px"}}
                                            onClick={() => handlePost(title, text)}><MdPostAdd/></CreateBtn></div>
        </div>
      </TopMenu>
      <Main>
        <div className='Container'>
          <div className='user'>
            <img src={profile} style={{width: "50px", marginRight: "10px", marginLeft: "10px"}}></img>
            <div className='user-info'>
              <div style={{width: "90%"}}>닉네임</div>
              <div style={{width: "90%"}}>{`${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`}</div>
            </div>
          </div>

          <div className='title'>
            <input ref={title} className='' type="text" style={{
              padding: "10px 20px",
              margin: "5px 0",
              boxSizing: "border-box",
              border: "none",
              width: "100%",
              height: "99%"
            }}/>
          </div>

          <div className='content'>
            <textarea ref={text} name="" id=""></textarea>
          </div>

          <div className='add-list'>
            <div className='list-box'>
              {timeline.map(e =>
                <div className='item' key={e.id}>
                  <MdCancel onClick={() => {
                    handleDelete(e)
                  }} className='button'/>
                  {e.id}
                </div>)}
            </div>
            <CreateBtn className='btnplus' onClick={() => {
              setIsCreate(!isCreate)
            }} style={{width: "16%", height: "80%", marginRight: "0px", marginLeft: "5px", backgroundColor: "#A1EAFB"}}>
              <AiOutlinePlus/></CreateBtn>
          </div>

        </div>

      </Main>
      {isCreate && <DiaryModal setIsCreate={handleCreate}/>}

    </Container>

  )
}

export default DiaryCreate