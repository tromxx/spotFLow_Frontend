import axios from "axios";

const DOMAIN = "http://localhost:8111"

const DiaryApi = {
  saveDiary : async (email, title, content, timeLineList) => {
    const requestData = {
      title : title,
      content : content,
      email : email,
      timeLineList : timeLineList 
      // timeLineList : [
      //   {
      //     id : 1
      //   }
      // ]
      
    }
    return axios.post(DOMAIN + "/diary", requestData);
  },
  // id = 다이어리 식별 번호
  findDiary : async (id) => {
    return axios.get(DOMAIN + "/diary" + {id});
  },
  findMyDiary : async (email) => {
    return axios.get(DOMAIN + "/diary/all", {email});
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

  }
}

export default DiaryApi;