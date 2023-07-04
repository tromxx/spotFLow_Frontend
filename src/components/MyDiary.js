import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import dummy from "../dataSet/TimeLineData";
import Checkbox from "./CheckBox";


const MyDiarydiv = styled.div`
    /* border: solid 1px red; */
    width: 70vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    top:20px;
    @media (max-width: 400px) {
      width: 90vw;
    }
    .container{
      border-radius: 20px;
      /* border: solid 3px black; */
      width: 75vw;
      height: 70vh;
      display: grid;
      gap: 0px;
      /* grid-auto-rows: minmax(100px, auto);
      grid-template-columns: repeat(auto-fit, minmax(300px, 2fr)); */
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: auto;

      @media (max-width:850px) {
          grid-template-columns: 1fr 1fr ;
      }
      
      @media (max-width:550px) {
          grid-template-columns: 1fr;
      }
      @media (max-width: 400px) {
        width: 90vw;
      }

      grid-gap: 0px;
      overflow-y: scroll;
    
    }

    .container::-webkit-scrollbar {
      display: none;
    }
    .box{
      /* border: solid 1px violet; */
      justify-content: center;
      align-items: center;
      display: flex;
      width: 100%;
      height: 300px;
      /* margin: 30px; */
      border: solid 1px black;
      /* border-radius: 5px; */
      position: relative;
      @media (max-width: 400px) {
        border: .2px solid rgb(0,0,0,30%);
      }
    }
    .img-box {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #e2e2e2;
      align-items: center;
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    .image{
      position: relative;
      top: 0;
      left: 0;
      transform: translate(50, 50);
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: auto;
      
      /* border: solid 1px red; */
    }
    .plus{
      width: 30px;
      height: 30px;
    }
    .check{
      /* border: solid 2px red; */
      position: absolute;
      width: 30px;
      height: 30px;
      top:0%;
      left:0%;
      align-items: center;
      justify-content: center;
      display: flex;
    }

    .input[id="check1"] {
      display: none;
      }

      .input[id="check1"] + label {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 2px solid #bcbcbc;
        cursor: pointer;
    }
    input[id="check1"]:checked + label {
    background-color: #666666;
    }
    .checkboxes{
      position: relative;
      width: 20px;
      height: 20px;
    }
`;


    const MyDiary = ({stat}) => {
      const [items, setItems] = useState(new Set());

      const itemHandler = (id, isChecked) => {
        if(isChecked) {
          items.add(id);
          setItems(items);
        } else if (!isChecked) {
          items.delete(id);
          setItems(items);
        }
        console.log(items)
      }

      useEffect(() =>{
        
      } , [stat]);


    return(
        <MyDiarydiv>
            <div className="container">
                  {/* <div class="box">
                    {!stat ?
                    <div className="check">
                      <input type="checkbox" id="check1" className="checkboxes"/>
                      <label for="check1"></label>
                    </div>
                    : null}
                   
                    
                  </div> */}
                  
                    {/* <div class="box"> 
                    <div className="check">
                        <input type="checkbox" id="check1" className="checkboxes"/>
                            <label for="check1"></label>
                            </div>
                        </div> */}
                       {
                  dummy.map((data, index) => (
                    <div class="box">
                      {stat && (
                        <Checkbox
                          key = {index}
                          id = {data.id}
                          itemHandler = {itemHandler}
                        />
                      )}
                      <div className="img-box">
                        <img className="image" src={data.image} alt="" />
                      </div>
                    </div>
                  ))
                }

                     <div class="box"  style={{backgroundColor:"#d9d9d9"}}>
                  
                            <div className="image-box">
                          <AiOutlinePlus className="plus"/>
                        </div>
                    </div>
                  </div>
            
        </MyDiarydiv>
    );
};

export default MyDiary;