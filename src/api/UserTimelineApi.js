/* 타임라인 정보를 핸들링하는 api */
import axios from "axios";

const DOMAIN = "http://localhost:8111"

const api = axios.create({
  withCredentials: true,  // 쿠키 자동 포함 설정
});

const userTimelineApi = {
  // 모든 타임라인 정보를 가져옴
  getUserTimelineList: async (lastId) => {
    return await axios.get(DOMAIN + "/timeline/testing", {
      params: {
        lastTimeLineId: lastId
    }
  });
},
  // 특정 유저의 타임라인 정보를 가져옴
  getUserTimeline: async (email) => {
    return await axios.get(DOMAIN + "/timeline/user/" + email);
  },
  // 특정 타임라인 정보를 가져옴
  getTimeline: async (timeline) => {
    return await axios.get(DOMAIN + "/timeline/" + timeline.index);
  }, 

  // 특정 타임라인의 장소별 검색 결과가져옴
  getTimePlace: async (place) => {
  return await axios.get(DOMAIN + "/timeline/search"  , {
    params: {
      place: place
    }
  });
  }, 

  // 타임라인 정보를 저장함 (이성근 수정중)
  setUserTimeline: async (props) => {
    const data = {
      email : props.email,
      lat : props.lat,
      lng : props.lng,
      tl_profile_pic : props.image,
      title : props.title,
      content : props.content,
      updateTime : props.date,
      category : props.category,
    }
    return await axios.post(DOMAIN + "/timeline/post" , data);
  },
  // 타임라인 정보를 수정함
  reWrite: async (timeline) => {
    return await axios.put(DOMAIN + "/timeline/" + timeline.index, timeline);
  },
  // 조회수를 올려줌
  upView: async (postId) => {
    return await api.put( DOMAIN + `/timeline/${postId}/views` );
  },

  

}

export default userTimelineApi;