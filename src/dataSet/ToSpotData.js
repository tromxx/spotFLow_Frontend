const ToSpot = {
  getPlace: () => {
    const place = [{
      num : 1,
      location: "가로수길",
      name : "가로수길",
      lat: 37.5212557526595,
      lng: 127.023032708155
    }, {
      num : 2,
      location: "홍대 관광특구",
      name : "홍대",
      lat: 37.555629126086,
      lng: 126.92370965927591
    }, {
      num : 3,
      location: "이태원 관광특구",
      name : "이태원",
      lat: 37.54040410897566,
      lng: 126.99216997726722
    }, {
      num : 4,
      location: "명동 관광특구",
      name : "명동",
      lat: 37.56576644555232,
      lng: 126.98450443026759
    }, {
      num : 5,
      location: "잠실 관광특구",
      name : "잠실",
      lat: 37.51116222894772,
      lng: 127.09800673535563
    }];
    return place;
  },
  setMapData: (lat, lng, loc) => {
    const data = {
      latitude : lat,
      longitude : lng,
      location : loc
    }
    console.log(data);
    return data;
  },
}

export default ToSpot;