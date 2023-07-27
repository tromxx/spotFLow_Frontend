import React, { useState } from "react";
import { styled } from "styled-components";
import NoficationContainer from "../components/NoficationContainer";
import { useEffect } from "react";
import NotificationApi from "../api/NotificationApi";

const NoficationWrapper = styled.div`
 	display: flex;
  justify-content: center;
  align-items: center;
	text-align: center;
	background-color: ${props=>props.theme.bgColor};
	height: 100vh;
  
`;

const NoficationDiv = styled.div`
  background-color: ${props=>props.theme.bgColor};
  color: ${props=>props.theme.textColor};
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	width: 60%;
  height: 93vh;
	min-height: 93vh;
  display: flex;
  align-items: center;
	text-align: center;
	flex-direction: column;
	position: relative;
  overflow-y: scroll;
  margin: 40px auto; 
  
`;

const ScrollBar = styled.div`
	width: 100%;
	height: 100vh;
  
	::-webkit-scrollbar {
    width: 8px;  /* 스크롤바의 너비 */
		
	}

	::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: #d9d9d9; /* 스크롤바의 색상 */
    border-radius: 10px;
		transition: 0.2s ease;
	}

	::-webkit-scrollbar-thumb:hover {
    background-color: grey;
  }
	
`;

const Nofication = () => {
  const [nofiData, setNofiData] = useState("");
  useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    const fetchNoti = async () => {
      try {
        const response = await NotificationApi.getAllNoti(token);
        if (response !== null) {
          setNofiData(response.data);
        }
      } catch (error) {
        console.log(error);
       
      }
    }
    
  
    const updateNoti = async () => {
      try {
        const updated = await NotificationApi.updateFetchNoti(token, nofiData);
      } catch (error) {
        console.log(error);
      }
    }
  
    const fetchDataAndUpdate = async () => {
      await fetchNoti();
      if (nofiData !== null) {
        await updateNoti();
      }
    };
  
    fetchDataAndUpdate();
  }, []);
  

  return (
    <NoficationWrapper>
       
       <ScrollBar>
        <NoficationDiv>
          
              {nofiData !== "" && nofiData.map((nofiData) => (
                    <NoficationContainer
                      className="nofiContainer"
                      id={nofiData.id}
                      diaryTitle={nofiData.diary}
                      name={nofiData.commentWriter}
                      comment={nofiData.comment}
                    />
                  ))}
          
        </NoficationDiv>
      </ScrollBar>
    </NoficationWrapper>
  );
}

export default Nofication;