import React, { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, useMap } from "react-kakao-maps-sdk";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ToSpotData from "../dataSet/ToSpotData";
import * as ToSpot from "../components/ToSpotComponent";
import { LuCircleDot } from "react-icons/lu";

const MapView = React.memo((props) => {
  const navigate = useNavigate();
  const [loc, setLoc] = useState("");
  const [lat, setLat] = useState(37.4923615);
  const [lng, setLng] = useState(127.0292881);

  const userData = ToSpotData.getClusterSample().positions;

  const user = userData.map(i => ({
    name: "a",
    img: `${process.env.PUBLIC_URL}/public_assets/default_avatar.png`,
    lat: i.lat,
    lng: i.lng,
    loc: loc
  }));

  const data = user.map(i => ({
    content: ToSpotData.setOverlay(i),
    lat: i.lat,
    lng: i.lng
  }));

  const place = ToSpotData.getPlace();
  const [isToSpotBtnState, setIsToSpotBtnState] = useState(0);

  const btnToSpotMoreView = () => {
    setIsToSpotBtnState(prevState => (prevState === 0 ? 1 : 0));
  };

  const ToTimeLine = (location) => {
    console.log(location);
    navigate("/flow", {
      state: {
        loc: location
      }
    });
  };

  const toSpotFocus = (latitude, longitude, location) => {
    console.log(lat + "/" + lng + "/" + loc);
    setLat(latitude);
    setLng(longitude);
    setLoc(location);
  };

  const [viewSet, setViewSet] = useState(0);

  const convertViewSet = () => {
    setViewSet(prevState => (prevState === 0 ? 1 : 0));
  };

  const EventMarkerContainer = React.memo(({ lat, lng, content }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <>
        <MapMarker
          position={{
            lat: lat,
            lng: lng
          }}
          onClick={(marker) => {
            map.panTo(marker.getPosition());
            setIsVisible(prevState => !prevState);
          }}
        />
        {isVisible &&
          <CustomOverlayMap position={{
            lat: lat,
            lng: lng
          }}>
            {content}
          </CustomOverlayMap>
        }
      </>
    );
  });

  useEffect(() => {
    // console.log(mapData.lat);
    // console.log(mapData.lng);
    // console.log(mapData());
  }, [props]);

  return (
    <ToSpot.Container>
      <Map
        center={{
          lat: lat,
          lng: lng,
        }}
        style={{
          width: "100%",
          height: "93vh",
          position: "relative",
          zIndex: 1
        }}
        level={3}
      >
        {viewSet === 0 ? (
          <MarkerClusterer
            averageCenter={true}
            minLevel={1}
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
                key={`EventMarkerContainer-${value.lat}-${value.lng}`}
                lat={value.lat}
                lng={value.lng}
                content={value.content}
              />
            ))
          )}

        {place.map(p => (
          <ToSpot.Btn translateY={(p.num * 6 * isToSpotBtnState)}>
            <div className={"hot-spot"}>
              <div className="to-spot item" onClick={() => toSpotFocus(p.lat, p.lng, p.location)}>
                <FaMapMarkerAlt className="marker" size={25} />
              </div>
              <div className="btn-sub to-timeline" onClick={() => ToTimeLine(p.location)}>{p.name}</div>
            </div>
          </ToSpot.Btn>
        ))}

        <ToSpot.Btn>
          <div className="hot-spot">
            <div className="to-spot main" onClick={() => btnToSpotMoreView()} style={{ marginRight: "3px" }}>
              <FaMapMarkerAlt className="marker" size={25} />
            </div>
            <div className="btn-main to-timeline more" onClick={() => ToTimeLine('')}>TimeLine</div>
          </div>
        </ToSpot.Btn>

        <ToSpot.Converter onClick={() => convertViewSet()}>
          {viewSet === 0 ?
            <LuCircleDot className="icon" size={30} /> :
            <FaMapMarkerAlt className="icon" size={30} />
          }
        </ToSpot.Converter>

      </Map>
    </ToSpot.Container>
  );
});

export default MapView;
