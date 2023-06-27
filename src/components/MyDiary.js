import React from "react";
import { styled } from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

const MyDiarydiv = styled.div`
    /* border: solid 1px red; */
    width: 70vw;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    top:20px;

    .container{
    border-radius: 20px;
    /* border: solid 3px black; */
    width: 70vw;
    height: 70vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px;
    grid-auto-rows: minmax(100px, auto);
  }
  .box{
    /* border: solid 1px violet; */
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
    /* margin: 30px; */
    border: solid 1px black;
    /* border-radius: 5px; */
  }
  .image{
    width: 80%;
    height: 80%;
    background-color: #e2e2e2;
    border-radius: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    /* border: solid 1px red; */
  }
  .plus{
    width: 30px;
    height: 30px;
  }
  .check{
    border: solid 2px red;
    position: absolute;
    width: 30px;
    height: 30px;
    top:23%;
    left:14%;
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


const MyDiary = () => {
    return(
        <MyDiarydiv>
            <div className="container">
                  <div class="box">
                    <div className="check">
                        <input type="checkbox" id="check1" className="checkboxes"/>
                            <label for="check1"></label>
                            </div>
                    <div className="image">
                    <AiOutlinePlus className="plus"/>
                    </div>
                  </div>
                    <div class="box">
                    {/* <div className="image"></div> */}
                      </div>
                    <div class="box"> 
                    {/* <div className="image"></div> */}
                        </div>
                    <div class="box"> 
                    {/* <div className="image"></div> */}
                        </div>
                    <div class="box"> 
                    {/* <div className="image"></div> */}
                        </div>
                    <div class="box"> 
                    {/* <div className="image"></div> */}
                        </div>
                   
                  </div>
            
        </MyDiarydiv>
    );
};

export default MyDiary;