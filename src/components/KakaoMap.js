/*global kakao*/  
import React, {useEffect, useState} from 'react'
import {styled} from "styled-components";

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
  #map {
    width: 100vw;
    height: 93vh;
    position: relative;
    z-index: 1;
  }
`;
const KakaoMap=({latditude, longditude})=>{
  const {location, setLocation} = useState("");


  useEffect(()=>{
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(37.4923615,127.0292881),
      level: 3
    };
    let map = new kakao.maps.Map(container, options);
    }, [])

    return (
      <Container>
        <div id="map"></div>
      </Container>
    )
} 

export default KakaoMap;
