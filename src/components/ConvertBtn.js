import React, {useEffect, useState} from 'react';
import {LuCircleDot} from "react-icons/lu";
import {FaMapMarkerAlt} from "react-icons/fa";
import * as ToSpot from "../components/ToSpotComponent";

export let viewMode = 0;
const ConvertBtn = () => {
  // viewSet 표시 여부 ex) 0 = 혼잡도, 1 = 도트
  const [viewSet, setViewSet] = useState(0);
  // 맵에 표시할 모드를 변환하는 함수
  const convertViewSet = () => {
    if (viewSet === 0) setViewSet(1, ()=>{
      viewMode = 1;
    });
    else setViewSet(0, ()=>{
      viewMode = 0;
    });
  }

  return (
    <>
      {/* 맵에 보이는 모드를 전환 시켜줌*/}
      <ToSpot.Converter onClick={() => convertViewSet()}>
        {viewSet === 0 ?
          <LuCircleDot className="icon" size={30}/>
          :
          <FaMapMarkerAlt className="icon" size={30}/>
        }
      </ToSpot.Converter>
    </>
  );
}

export default ConvertBtn;