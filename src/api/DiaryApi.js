import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
  saveDiary : async (email, title, content, timeLineList) => {
    const requestData = {
      title : title,
      content : content,
      email : email,
      timeLineList : [
        {
          id : 1
        }
      ]
    }
    return axios.post(DOMAIN + "/diary", requestData);
  },
<<<<<<< HEAD
  findDiary : async () => {
    const params = {
      email: "whddus426@gmail.com"
    };
    return axios.get(DOMAIN + "/diary/all" , { params});
  },
  deleteDiary : async() => {
    const data = {
      "id" : 1, // 다이어리 식별번호
      "title":"삭제된 게시글입니다.", // 제목 
      "content" : "삭제된 게시글입니다.", // 
      "timeLineList" : [
          {
              "id" : 2
          },
          {
              "id" : 3
          }
      ]
  }
  return new axios.delete(DOMAIN + "/diary", data);
=======
  // id = 다이어리 식별 번호
  findDiary : async (id) => {
    return axios.get(DOMAIN + "/diary");
  },
  findMyDiary(email) {
    return axios.get(DOMAIN + "/diary/all");
>>>>>>> 094adec684842bfba552a3db5ef21c083e2805d8
  }
}

export default DiaryApi;