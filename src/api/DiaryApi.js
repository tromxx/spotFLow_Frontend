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
    return axios.delete(`${DOMAIN}/diary/delete?id=${id}`);
  },
  sendComment : async (props) => {
    const comment = {
      diary : props.diary,
      content : props.content,
      email : props.email
    }
    return await axios.post(DOMAIN + "/diary/comment", comment);
  }
}

export default DiaryApi;