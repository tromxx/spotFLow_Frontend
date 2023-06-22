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


  /*
  * 도시데이터 api 접목
  * 로직 :
  * 1. API 를 통해 저장된 장소 배열을 반복해서 인수를 돌려
  *    원하는 데이터만 json 배열로 저장(clear)
  *
  * 2. 저장된 모든 핫플레이스 정보를 맵에 렌더링 될 때 모두 표시
  *
  * 단점 :
  * 1. 단점으로는 한가지만 해도 방대한 양의 데이터를 가져오는데
  *    배열로 반복문을 돌리다보니 상당히 많은 시간이 소요 됨
  *
  * 해결 방안 :
  * 1. 해결 방법으로는 기능 구현은 해당 컴포넌트에서 하되
  *    프로그램을 시작함과 동시에 api에 접근한다면
  *    필요한 데이터를 간추려서 전달하기 때문에
  *    많은 시간 절약이 생길 것으로 생각됨
  */
  async function apiTest()  {
    let places = ToSpotData.getPlace();
    const test = await ToSpotData.getCityDataList(places);
    console.log(test);
  }

  /*
   * 혼잡도, 유저 이벤트 컨버트
   * 로직 :
   * 1. 정보공유 허용한 유저만 데이터를 받아와서 웹소켓 세션에 저장
   *    클라이언트는 위치정보를 서버에 보내고 서버는 위치 정보를 받아서 저장한다
   *    당연히 이 모든 통신은 웹소켓으로 이루어진다.
   *
   * 2. 뷰셋이 유저 이벤트로 설정되어 있으면 3-4번을 실행한다.
   *
   * 3. 세션에 저장되어 있는 유저 정보를 웹소켓을 통해 받아옴
   *    (이 기능만 컴포넌트로 분리)
   *
   * 4. 받아온 유저(위치)데이터를 통해 서버에 유저(프로필)데이터를 받아온다.
   *
   * 5. 해당 위치 데이터에 의거해서 마커를 찍고
   *    프로필 데이터를 토대로 오버레이를 생성해준다.
   *
   * 6. 뷰셋이 혼잡도로 설정 되어 있으면 api 접목 로직을 사용한다.
   *
   * 7. 우측 상단버튼은 좌표만 전달 받아 지도 이동,
   *    혹은 지역 이름만 받아 타임라인으로 이동한다.
   */



  // let cluster = new kakao.maps.MarkerClusterer({
  //   map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  //   minLevel: 10, // 클러스터 할 최소 지도 레벨
  //   disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
  // });
  //
  // let markers = ToSpotData.getClusterSample().map((i, position) => {
  //   return new kakao.maps.Marker({
  //     position : new kakao.maps.LatLng(position.lat, position.lng)
  //   });
  // });
  // // 클러스터러에 마커들을 추가합니다
  // cluster.addMarkers(markers);
  // // 마커 클러스터러에 클릭이벤트를 등록합니다
  // // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
  // // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
  // kakao.maps.event.addListener(cluster, 'clusterclick', function(cluster) {
  //   // 현재 지도 레벨에서 1레벨 확대한 레벨
  //   let level = map.getLevel()-1;
  //   // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
  //   map.setLevel(level, {anchor: cluster.getCenter()});
  // });

  useEffect( ()=>{
    console.log(mapData.latitude);
    console.log(mapData.longitude);

    if (mapData.latitude > 0) lat = mapData.latitude;
    if (mapData.longitude > 0) lng = mapData.longitude;
    if (mapData.location !== "" && mapData.location !== undefined)
      setLoc(mapData.location);

    if (props.ViewSet === 1) apiTest();

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
