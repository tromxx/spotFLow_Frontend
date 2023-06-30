import React from "react";
import { styled } from "styled-components";
import dummy from "../dataSet/TimeLineData";

const DiaryCatediv = styled.div`
    /* border: solid 1px red; */
    width: 100%;
    height: 75vh;
    flex-grow: 1;
    align-items: center;
    /* @media (max-width:900px) {
        grid-template-columns: 1fr 1fr ;
    } */
    
    

  .container{
    border-radius: 20px;
    border: 5px solid black;
    width: 100%;
    height: 73vh;
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */
    gap: 0px;
    grid-auto-rows: minmax(250px, auto);
    grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
    grid-gap: 10px;
    overflow-y: scroll;
  
    /* @media (min-width:1000px) {
        grid-template-columns: 1fr 1fr ;
    }
     */
    
    
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
    margin-left: 15px;
    

  }
  .image{
    width: 100%;
    height: 100%;
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
                              <img className="image" src={e.image}/>
                            </div>
                          )
                        }
                        {/* <div class="box">
                              <idiv className="image"> ++++++</idiv>
                            </div> */}
                  </div>
            </DiaryCatediv>
    );
};
export default DiaryCate;