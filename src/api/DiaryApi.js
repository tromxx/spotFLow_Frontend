import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
  saveDiary : async (email, title, content, timeLineList) => {
    const requestData = {
      title : title,
      content : content,
      email : email,
      timeLineList : timeLineList
    }
    return axios.post(DOMAIN + "/diary", requestData);
  },
  // id = 다이어리 식별 번호
  findDiary : async (id) => {
    return axios.get(DOMAIN + "/diary");
  },
  findMyDiary(email) {
    return axios.get(DOMAIN + "/diary/all");
  }
}

export default DiaryApi;