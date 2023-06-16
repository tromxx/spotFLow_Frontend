/*global kakao*/  
import React, { useEffect } from 'react'
const KakaoMap=({latditude, longditude})=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.4923615,127.0292881),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    }, [])

    return (
        <div id="map" style={{width:'100vw', height:'100vw'}}></div> 
    )
} 

export default KakaoMap;
