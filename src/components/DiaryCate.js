import React from "react";
import { styled } from "styled-components";
import dummy from "../dataSet/TimeLineData";

const DiaryCatediv = styled.div`
    /* border: solid 1px red; */
    width: 60vw;
    height: 75vh;
    flex-grow: 1;

    

  .container{
    border-radius: 20px;
    border: solid 5px black;
    width: 60vw;
    height: 75vh;
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    gap: 0px;
    grid-auto-rows: minmax(170px, auto);
    grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
    grid-gap: 0px;
    overflow-y: scroll;
    
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
    border-radius: 5px;
    

  }
  .image{
    width: 80%;
    height: 80%;
    background-color: gray;
    /* border: solid 1px red; */
  }
  `;
const DiaryCate = () => {
    return(
            <DiaryCatediv>
              <div className="container">
                  {/* <div class="box">
                    <div className="image"></div>
                  </div>
                    <div class="box">
                    <div className="image"></div>
                      </div>
                    <div class="box"> 
                    <div className="image"></div>
                        </div>
                    <div class="box"> 
                    <div className="image"></div>
                        </div>
                    <div class="box"> 
                    <div className="image"></div>
                        </div>
                    <div class="box"> 
                    <div className="image"></div>
                        </div>
                    <div class="box"> 
                    <div className="image"></div>
                        </div>
                    <div class="box"> 
                    <div className="image"></div>
                        </div>
                    <div class="box"> 
                      <div className="image"></div>
                        </div>  */}
                        {
                          dummy.map((e)=> 
                            <div class="box">
                              <img className="image" src={e.image}></img>
                            </div>
                          )
                        }
                        <div class="box">
                              <idiv className="image"> ++++++</idiv>
                            </div>
                  </div>
            </DiaryCatediv>
    );
};
export default DiaryCate;