/*global kakao*/
import React, {useEffect, useState} from 'react'
import {styled} from "styled-components";
import CityDataApi from "../api/CityDataApi";
import ToSpotData from "../dataSet/ToSpotData";

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
  #map {
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 1;
  }
`;
const KakaoMap=(props)=>{
  const [loc, setLoc] = useState("");
  const mapData = props.MapData;
  let lat = 37.4923615;
  let lng = 127.0292881;

  useEffect( ()=>{
    console.log(mapData.latitude);
    console.log(mapData.longitude);

    if (mapData.latitude > 0) lat = mapData.latitude;
    if (mapData.longitude > 0) lng = mapData.longitude;
    if (mapData.location !== "" && mapData.location !== undefined)
      setLoc(mapData.location);

    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
    let clusterer = new window.kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 1 // 클러스터 할 최소 지도 레벨
    });

    let markers = ToSpotData.getClusterSample().positions.map((item) => {
      return  new window.kakao.maps.Marker({
        position : new window.kakao.maps.LatLng(item.lat, item.lng),
      });
    });
    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

    }, [props])

    return (
      <Container>
        <div id="map"></div>
      </Container>
    )
} 

export default KakaoMap;
