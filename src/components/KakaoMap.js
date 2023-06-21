/*global kakao*/  
import React, {useEffect, useState} from 'react'
import {styled} from "styled-components";

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


  useEffect(()=>{
    console.log(mapData.latitude);
    console.log(mapData.longitude);
    if (mapData.latitude > 0) lat = mapData.latitude;
    if (mapData.longitude > 0) lng = mapData.longitude;
    if (mapData.location === "" && mapData.location !== undefined) setLoc(mapData.location);
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
