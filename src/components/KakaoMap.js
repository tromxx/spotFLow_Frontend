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
const KakaoMap=({latitude, longitude})=>{
  const {location, setLocation} = useState("");
  let lat = 37.4923615;
  let lng = 127.0292881;


  useEffect(()=>{
    console.log(latitude);
    console.log(longitude);
    if (latitude > 0) lat = latitude;
    if (longitude > 0) lng = longitude;
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
    }, [latitude, longitude])

    return (
      <Container>
        <div id="map"></div>
      </Container>
    )
} 

export default KakaoMap;
