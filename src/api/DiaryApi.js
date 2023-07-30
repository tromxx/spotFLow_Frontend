import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
  saveDiary: async (title, content, timeline) => {
    const token = localStorage.getItem("authToken")
    const requestData = {
      title: title,
      content: content,
      timeLineList: timeline
    }
    return axios.post(DOMAIN + "/diary", requestData, {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  // id = 다이어리 식별 번호
  findDiary: async (id) => {
    return axios.get(DOMAIN + "/diary?num=" + id);
  },

  findMyDiary: async () => {
    const token = localStorage.getItem("authToken");
    return axios.get(DOMAIN + "/diary/my-diary",{
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
  sendcommentNoti: async (comment) => {
    const token = localStorage.getItem("authToken");
    return await axios.post(DOMAIN + "/notification/comment", comment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
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
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + "/diary/following", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  thumbsUP : async(id) => {
    const token = localStorage.getItem("authToken")
    const request = {
      id : id,
    }
    return await axios.put(DOMAIN + "/diary/like", request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  },

  findThumbs : async(id) => {
    const token = localStorage.getItem("authToken")
    return await  axios.get(DOMAIN + "/diary/like/" + id,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }}
    );
  },

  findAllDiary: async () => {
    return await axios.get(DOMAIN + "/diary/all");
  }

}

export default DiaryApi;