/*global kakao*/
import React, {useEffect, useState} from 'react'
import {styled} from "styled-components";
import "../pages/css.css"

const {kakao} = window;

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
const KakaoMap = (props) => {
  const [loc, setLoc] = useState("");
  const [lat, setLat] = useState(37.4923615);
  const [lng, setLng] = useState(127.0292881);
  const mapData = props.MapData;
  // let lat = 37.4923615;
  // let lng = 127.0292881;


  useEffect(() => {
    // console.log(mapData.latitude);
    // console.log(mapData.longitude);
    //
    // if (mapData.latitude > 0) setLat(mapData.latitude);
    // if (mapData.longitude > 0) setLng(mapData.longitude);
    // if (mapData.location !== "" && mapData.location !== undefined) setLoc(mapData.location);
    //
    // let container = document.getElementById('map');
    // let options = {
    //   center: new kakao.maps.LatLng(lat, lng), level: 3
    // };
    // let map = new kakao.maps.Map(container, options);

  }, [props]);

  return (
    <Container>
      <div id="map"></div>
    </Container>
  );
}

export default KakaoMap;
