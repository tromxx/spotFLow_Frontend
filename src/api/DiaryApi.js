import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
  saveDiary: async (email, title, content, timeline) => {
    const requestData = {
      email: email,
      title: title,
      content: content,
      timeLineList : timeline
    }
    return axios.post(DOMAIN + "/diary", requestData);
  },
  // id = 다이어리 식별 번호
  findDiary: async (id) => {
    return axios.get(DOMAIN + "/diary?num=" + id);
  },
  findMyDiary: async (email) => {
    return axios.get(DOMAIN + "/diary/all?email=" + email);
  },
  deleteDiary: async (id) => {
    const requestData = {
      id : id
    }
    return axios.delete(`${DOMAIN}/diary/check`, { data: requestData });
  }
  ,
  sendComment : async (props) => {
    const comment = {
      diary : props.diary,
      content : props.comment,
      email : props.email
    }
    console.log(comment)
    return await axios.post(DOMAIN + "/diary/comment", comment);
  },
  deleteComment : async (comment) => {
    console.log(comment)
    return await axios.delete(DOMAIN + "/diary/comment/" + comment);
  },
  // diaryMyPage : async () => {
  //   return await axios.post(DOMAIN + "diary/mypage", )
  // }
}

export default DiaryApi;