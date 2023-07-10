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
  }
}

export default DiaryApi;