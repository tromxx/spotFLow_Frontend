/*global kakao*/  
import React, {useEffect, useState} from 'react'
import {styled} from "styled-components";
import CityDataApi from "../api/CityDataApi";

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
  #map {
    width: 100%;
    height: 93vh;
    position: relative;
    z-index: 1;
  }
`;
const KakaoMap=(props)=>{
  const [loc, setLoc] = useState("");
  const mapData = props.MapData;
  let lat = 37.4923615;
  let lng = 127.0292881;

  /*
  * 도시데이터 api 접목 테스트 코드
  * 로직 :
  * 1. 전체 데이터셋을 배열에 넣고 한번에 지도에 미리 그려넣기
  * 2. 버튼으로 좌표만 전달 받아 지도 이동, 혹은 지역 이름만 받아 타임라인으로 이동
  * 3.
  */
  async function apiTest(place)  {
    let test = await CityDataApi.getCityData(place);
    console.log(test);
  }

  useEffect( ()=>{
    console.log(mapData.latitude);
    console.log(mapData.longitude);
    if (mapData.latitude > 0) lat = mapData.latitude;
    if (mapData.longitude > 0) lng = mapData.longitude;
    if (mapData.location !== "" && mapData.location !== undefined) {
      setLoc(mapData.location);
      apiTest(mapData.location).then(r => console.log("거부 됨"));
    }
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
    }, [props])

    return (
      <Container>
        <div id="map"></div>
      </Container>
    )
} 

export default KakaoMap;
