import React, {useEffect, useState} from 'react';
import {CustomOverlayMap, Map, MapMarker, MarkerClusterer, useMap} from "react-kakao-maps-sdk";
import {FaMapMarkerAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import ToSpotData from "../dataSet/ToSpotData";
import * as ToSpot from "../components/ToSpotComponent";
import {LuCircleDot} from "react-icons/lu";

const MapView = (props) => {
  const navigate = useNavigate();
  const [loc, setLoc] = useState("");
  const [lat, setLat] = useState(37.4923615);
  const [lng, setLng] = useState(127.0292881);

  const userData = ToSpotData.getClusterSample().positions;

  const user = userData.map(i => (
    {
      name: "a",
      img: `${process.env.PUBLIC_URL}/public_assets/default_avatar.png`,
      lat: i.lat,
      lng: i.lng,
      loc: loc
    }
  ));
  const data = user.map(i => (
    {
      content: ToSpotData.setOverlay(i),
      lat: i.lat,
      lng: i.lng
    }
  ))
  // 핫 플레이스 이름, 경도, 위도 데이터를 저장한 배열
  const place = ToSpotData.getPlace();
  // toSpot 버튼 아이템 표시 여부 ex) 0 = false, 1 = true
  const [isToSpotBtnState, setIsToSpotBtnState] = useState(0);
  // onClick 으로 표시 여부 핸들링
  const btnToSpotMoreView = () => {
    if (isToSpotBtnState === 0) setIsToSpotBtnState(1);
    else setIsToSpotBtnState(0);
  }
  // 해당 키워드를 갖고 타임라인으로 이동
  const ToTimeLine = (location) => {
    console.log(location)
    navigate("/timeline", {
      state: {
        loc: location
      }
    });
  }

  const toSpotFocus = (latitude, longitude, location) => {
    console.log(lat + "/" + lng + "/" + loc);
    setLat(latitude);
    setLng(longitude);
    setLoc(location);
  }

  // viewSet 표시 여부 ex) 0 = 클러스터, 1 = 오버레이
  const [viewSet, setViewSet] = useState(0);
  // 맵에 표시할 모드를 변환하는 함수
  const convertViewSet = () => {
    if (viewSet === 0) setViewSet(1);
    else setViewSet(0);
  }

  // 마커등록 및 이벤트 관리
  const EventMarkerContainer = ({lat, lng, content}) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)

    return (
      <>
        <MapMarker
          position={{
            lat: lat,
            lng: lng
          }} // 마커를 표시할 위치
          // @ts-ignore
          onClick={(marker) => {
            map.panTo(marker.getPosition())
            if (isVisible) setIsVisible(false);
            else setIsVisible(true);
          }}
        />
        {
          isVisible &&
          <CustomOverlayMap position={{
            lat: lat,
            lng: lng
          }}>
            {content}
          </CustomOverlayMap>
        }
      </>
    )
  }

  useEffect(() => {
    // console.log(mapData.lat);
    // console.log(mapData.lng);
    // console.log(mapData());
  }, [props]);

  return (
    <ToSpot.Container>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: lat,
          lng: lng,
        }}
        style={{
          position : "relative",
          width: "100%",
          height: "100vh",
        }}
        level={3} // 지도의 확대 레벨
      >
        {viewSet === 0 ? (
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={1} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true}
          >
            {data.map((pos) => (
              <MapMarker
                key={`${pos.lat}-${pos.lng}`}
                position={{
                  lat: pos.lat,
                  lng: pos.lng,
                }}
              />
            ))}
          </MarkerClusterer>
        ) : (
          data.map((value) => (
            <EventMarkerContainer
              // key={`EventMarkerContainer-${value.lat}-${value.lng}`}
              lat={value.lat}
              lng={value.lng}
              content={value.content}
            />
          ))
        )}

        {/*place 에 저장된 배열만큼 map 함수로 바로가기 버튼 생성*/}
        {place.map(p => (
          <ToSpot.Btn translateY={(p.num * 6 * isToSpotBtnState)}>
            <div className={"hot-spot"}>
              <div className="to-spot item" onClick={() => toSpotFocus(p.lat, p.lng, p.location)}>
                <FaMapMarkerAlt className="marker" size={25}/>
              </div>
              <div className="btn-sub to-timeline" onClick={() => ToTimeLine(p.location)}>{p.name}</div>
            </div>
          </ToSpot.Btn>
        ))}

        {/*바로가기 버튼을 보여주는 상위 버튼, timeline 문구를 클릭하면 검색값을 비운 채로 타임라인으로 이동*/}
        <ToSpot.Btn>
          <div className="hot-spot">
            <div className="to-spot main" onClick={() => btnToSpotMoreView()} style={{marginRight: "3px"}}>
              <FaMapMarkerAlt className="marker" size={25}/>
            </div>
            <div className="btn-main to-timeline more" onClick={() => ToTimeLine('')}>TimeLine</div>
          </div>
        </ToSpot.Btn>


        {/* 맵에 보이는 모드를 전환 시켜줌*/}
        <ToSpot.Converter onClick={() => convertViewSet()}>
          {viewSet === 0 ?
            <LuCircleDot className="icon" size={30}/>
            :
            <FaMapMarkerAlt className="icon" size={30}/>
          }
        </ToSpot.Converter>

      </Map>
    </ToSpot.Container>
  );
}

export default MapView;