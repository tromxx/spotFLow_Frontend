import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
  saveDiary: async (email, title, content, timeline) => {
    const requestData = {
      email: email,
      title: title,
      content: content,
      timeLineList: timeline
    }
    return axios.post(DOMAIN + "/diary", requestData);
  },

  // id = 다이어리 식별 번호
  findDiary: async (id) => {
    return axios.get(DOMAIN + "/diary?num=" + id);
  },

  findMyDiary: async (token) => {
    return axios.get(DOMAIN + "/diary/mydiary",{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  deleteDiary: async (id) => {
    const requestData = {
      id: id
    }
    return axios.delete(`${DOMAIN}/diary/check`, {data: requestData});
  }
  ,
  sendComment: async (props) => {
    const token = localStorage.getItem("authToken");
    const comment = {
      diary: props.diary,
      content: props.comment
    }
    console.log(comment)
    return await axios.post(DOMAIN + "/diary/comment", comment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
  deleteComment: async (comment) => {
    console.log(comment)
    return await axios.delete(DOMAIN + "/diary/comment/" + comment);
  },
  // diaryMyPage : async () => {
  //   return await axios.post(DOMAIN + "diary/mypage", )
  // }


  // 장소명으로 다이어리 검색 
  searchPlace: async (place) => {
    const body = {
      place: place
    }
    return await axios.post(DOMAIN + "/diary/search", body);
  },

  // 팔로우관계의 다이어리 검색
  searchFreind: async (email) => {
    return await axios.get(DOMAIN + "/diary/following?email=" + email);
  },

  thumbsUP : async(id, email) => {
    const request = {
      id : id,
      email : email
    }
    return await axios.put(DOMAIN + "/diary/like", request)
  },

  findThumbs : async(id, token) => {
    return await  axios.get(DOMAIN + "/diary/like?id=" + id,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }}
    );
  }

}

export default DiaryApi;