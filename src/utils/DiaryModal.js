import React from 'react'
import { useState } from 'react';
import styled , {css }from 'styled-components';
import timelinedata from '../dataSet/TimeLineData';

const centerAlign = css`
    display:flex;
    justify-content:center;
    align-items:center;
`

const ListContainer = styled.div`
    ${centerAlign}
    position: fixed;
    background-color: white;
    width: 61vw;
    height: 92vh;
    border: 1px solid;
    border-radius: 10px;
`
const List = styled.div`
    ${centerAlign}
    border : 1px solid ;
    width: 90%;
    height: 90%;
    flex-direction: column;

    .header {
        height: 10%;
        border:1px solid;
        width: 100%;
        ${centerAlign}
        flex-direction: row;
        .left {
            width: 50%;
        }
        .right {
            width: 50%;
            display:flex;
            justify-content: end;
        }
        button {
            margin: 5px;
            
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            
            background: var(--button-bg-color);
            color: var(--button-color);
            
            margin: 0;
            padding: 0.5rem 1rem;
            
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 1rem;
            font-weight: 400;
            text-align: center;
            text-decoration: none;
            
            border: none;
            border-radius: 4px;
            
            display: inline-block;
            width: auto;
            
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            
            cursor: pointer;
            
            transition: 0.5s;
        }
    }
    .list {
       
        margin:10px;
        height: 90%;
        border:1px solid;
        width: 100%;
        overflow: scroll ;

        .item{
            ${centerAlign}
            justify-content: start;
            width: 100%;

            border: 1px solid;
            height: 20%;

            img{
                margin:10px;
                width: 10%;
                height: 80%;
            }

            input[type="checkbox"] {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: 1px solid #999;
                appearance: none;
                cursor: pointer;
                transition: ease 0.2s;
            }

            input[type="checkbox"]:checked {
                background: lightblue;
                border: none;
            }

            .content {
               margin:20px;     
            }

        }


    
    }



`

const DiaryModal = ({setIsCreate}) => {
    const [selectedItems, setSelectedItems] = useState([]);


    const handleCheckboxChange = (e, item) => {
        if (e.target.checked) {
          setSelectedItems([...selectedItems, item]);
        } else {
          setSelectedItems(selectedItems.filter(i => i !== item));
        }
      };
    
      const handleButtonClick = () => {
        setIsCreate(selectedItems);
      };
    

    return (
       <ListContainer>
            <List>
                <div className='header'>
                    
                        <div className='left'>
                            타임라인 추가
                        </div>

                        <div className='right'>
                            <button>취소</button>
                            <button onClick={handleButtonClick}>완료</button>
                        </div>
                    
                </div>
                <div className='list'>
                        {
                        timelinedata.map((item)=>
                            <div className='item' key={item.id}>
                                <label>
                                    <input type="checkbox" onChange={e => handleCheckboxChange(e, item)}/>
                                </label>
                                <img src={item.image} alt="" />

                                <div className='content'>
                                        <div>{item.title}</div>
                                        <div>{item.content}</div>
                                </div>
                            </div>
                        )
                        
                        }

                 </div>    

            </List>
       </ListContainer>  
    );
}






export default DiaryModal