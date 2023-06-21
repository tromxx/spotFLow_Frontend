import React, {useState} from 'react';
import KakaoMap from "../components/KakaoMap";
import {FaMapMarkerAlt} from "react-icons/fa";
import {styled} from "styled-components";
import {useNavigate} from "react-router-dom";
import ToSpot from "../dataSet/ToSpotData";

const ToSpotBtn = styled.div`
  transition: transform 0.5s ease;
  transform: translateY(${({translateY}) => translateY + "px"});
  position: absolute;
  font-family: 'Prompt', sans-serif;
  top: 20px;
  right: 150px;
  z-index: 2;

  .to-timeline {
    width: 120px;
    height: 40px;
    position: absolute;
    display: flex;
    background-color: #3AACFF;
    color: white;
    z-index: 2;
    text-align: center;
    line-height: 1.8;
    padding: 5px;
    border-radius: 40px;
  }

  .to-spot {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: white;
    margin-right: 10px;
    padding: 5px;
  }

  .to-spot:hover {
    background-color: #eee;
  }

  .to-spot:active {
    background-color: #ccc;
  }

  .hot-spot:hover {
    background-color: #0097e6;
  }

  .hot-spot:active {
    background-color: #0077B6;
  }

  .more {
    background-color: #ccc;
    border: .3px solid rgb(0, 0, 0, 30);
    color: #000;
  }

  //800px 이하면 압축후 버튼으로 보이기 처리
  @media (max-width: 860px) {
  }
`;
const MapView = () => {
  const navigate = useNavigate();
// 핫 플레이스 이름, 경도, 위도 데이터를 저장한 배열
  const place = ToSpot.getPlace();
  // toSpot 버튼 아이템 표시 여부 ex) 0 = false, 1 = true
  const [isToSpotBtnState, setIsToSpotBtnState] = useState(0);
  const btnToSpotMoreView = () => { // onClick 으로 표시 여부 핸들링
    if (isToSpotBtnState === 0) setIsToSpotBtnState(1);
    else setIsToSpotBtnState(0);
  }
  const ToTimeLine = () => {
    navigate("/timeline", {
      state: {
        loc: location
      }
    });
  }
  const [latitude, setLatitude] = useState(37.4923615);
  const [longitude, setLongitude]= useState(127.0292881);
  const [location, setLocation] = useState("");
  const toSpotFocus = (lat, lng, location) => {
    console.log(lat + "/" + lng + "/" + location);
    setLongitude(lng);
    setLatitude(lat);
    setLocation(location);
  }
  return (
    <>
      <KakaoMap latitude={latitude} longitude={longitude}/>
      {place.map(p => (
        <ToSpotBtn translateY={(p.num * 50 * isToSpotBtnState)}>
          <div className={"hot-spot to-timeline"}>
            <div className="to-spot" onClick={() => toSpotFocus(p.lat, p.lng, p.location)}>
              <FaMapMarkerAlt size={20} color="#000000"/>
            </div>
            <span onClick={()=>ToTimeLine()}>{p.location}</span>
          </div>
        </ToSpotBtn>
      ))}
      <ToSpotBtn>
        <div className="to-timeline more">
          <div className="to-spot" onClick={() => btnToSpotMoreView()} style={{marginRight: "3px"}}><FaMapMarkerAlt
            size={20} color="#000000"/></div>
          <span onClick={()=>ToTimeLine()}>TimeLine</span>
        </div>
      </ToSpotBtn>
    </>
  );
}

export default MapView;