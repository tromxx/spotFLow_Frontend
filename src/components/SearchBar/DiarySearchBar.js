import React from 'react'
import styled from 'styled-components'
import {AiOutlineCamera, AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiFillDelete} from "react-icons/ai";

const Container = styled.div`
.Search-bar {
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

  `


function DiarySearchBar() {
  return (
        <div style={{width: "70%", position: "relative"}}>
            <input type="text" className="Search-bar"
            /> <AiOutlineSearch style={{position: "absolute", left: "30px", bottom: "7px"}}/>
          </div>
  )
}

export default DiarySearchBar