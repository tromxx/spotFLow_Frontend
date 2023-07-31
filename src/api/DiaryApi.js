import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
<<<<<<< HEAD

  //다이어리 저장하기
  saveDiary: async (data) => {
    const token = localStorage.getItem("authToken");
    return axios.post(DOMAIN + "/diary",data,{
=======
  saveDiary: async (title, content, timeline) => {
    const token = localStorage.getItem("authToken")
    const requestData = {
      title: title,
      content: content,
      timeLineList: timeline
    }
    return axios.post(DOMAIN + "/diary", requestData, {
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

<<<<<<< HEAD
  //특정 다이어리 디데일 정보 가죠오기 Diary Detail
=======
  // id = 다이어리 식별 번호
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
  findDiary: async (id) => {
    return axios.get(DOMAIN + "/diary?num=" + id);
  },

<<<<<<< HEAD
  //유저 다이어리 정보 가죠오기 
=======
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
  findMyDiary: async () => {
    const token = localStorage.getItem("authToken");
    return axios.get(DOMAIN + "/diary/my-diary",{
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },
<<<<<<< HEAD
  
  //특정 유저 diary 가죠오기
  findUserDiary: async (email) => {
    return axios.get(DOMAIN + "/diary/user?email=" + email);
  },

  //다이어리 업데이트
  updateDiary : async (data) => {
    return axios.post(DOMAIN + "/diary/update",data);
  },

  // 다이어리 조회수 올리기 
  increaseView : async (id) =>{
    const data = {
      id : id
    };
    return axios.put(DOMAIN + "/diary/view", data);
  }, 

  //다이어리 삭제
  deleteDiary: async(data) => {
    return axios.post(DOMAIN + "/diary/del", data);
  },

  //다이어리 댓글 달기
=======

  deleteDiary: async (id) => {
    const requestData = {
      id: id
    }
    return axios.delete(`${DOMAIN}/diary/check`, {data: requestData});
  }
  ,
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
  sendComment: async (props) => {
    const token = localStorage.getItem("authToken");
    const comment = {
      diary: props.diary,
<<<<<<< HEAD
      content: props.comment,
    }
    console.log(comment)
    return await axios.post(DOMAIN + "/diary/comment", comment,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }});
=======
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
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
  },

  //다이어리 댓글 삭재 하기
  deleteComment: async (comment) => {
    console.log(comment)
    return await axios.delete(DOMAIN + "/diary/comment/" + comment);
  },

<<<<<<< HEAD
  // 다이어리 좋아요 눌루기
=======

  // 장소명으로 다이어리 검색 
  searchPlace: async (place) => {
    const token = localStorage.getItem("authToken");
    const body = {
      place: place
    }
    return await axios.post(DOMAIN + "/diary/search", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
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

>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
  thumbsUP : async(id) => {
    const token = localStorage.getItem("authToken")
    const request = {
      id : id,
    }
<<<<<<< HEAD
    return await axios.put(DOMAIN + "/diary/like", request,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
  },

  // 다이어리 좋아요 수정하기
  findThumbs : async(id) => {
    const token = localStorage.getItem("auth")
=======
    return await axios.put(DOMAIN + "/diary/like", request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  },

  findThumbs : async(id) => {
    const token = localStorage.getItem("authToken")
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
    return await  axios.get(DOMAIN + "/diary/like/" + id,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }}
    );
  },
<<<<<<< HEAD
  
  // 다이어리 전체 조회 하기
  findAllDiary : async() =>{
    return await axios.get(DOMAIN + "/diary/all");
=======

  findAllDiary: async () => {
    const token = localStorage.getItem("authToken");
    return await axios.get(DOMAIN + "/diary/all", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
>>>>>>> 9b4d95112ad5228be55bf677ba1ce092dc4f6c78
  }

}

export default DiaryApi;

