import CityDataApi from "../api/CityDataApi";

const ToSpot = {
  getPlace: () => {
    return [{
      num: 1,
      location: "가로수길",
      name: "가로수길",
      lat: 37.5212557526595,
      lng: 127.023032708155
    }, {
      num: 2,
      location: "홍대 관광특구",
      name: "홍대",
      lat: 37.555629126086,
      lng: 126.92370965927591
    }, {
      num: 3,
      location: "이태원 관광특구",
      name: "이태원",
      lat: 37.54040410897566,
      lng: 126.99216997726722
    }, {
      num: 4,
      location: "명동 관광특구",
      name: "명동",
      lat: 37.56576644555232,
      lng: 126.98450443026759
    }, {
      num: 5,
      location: "잠실 관광특구",
      name: "잠실",
      lat: 37.51116222894772,
      lng: 127.09800673535563
    }];
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
  // 배열을 인자 만큼 api 에 접근하여 데이터를 다시 배열로 저장해서 반환한다.
  getCityDataList : async (places) => {
    const arr = [];
    for (let i = 0; i < places.length; i++) {
      console.log(places[i].location);
      const data =  await CityDataApi.getCityData(places[i].location);
      arr.push(data)
    }
    return arr;
  },
}

export default ToSpot;