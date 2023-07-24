import axios from "axios";

const DOMAIN = "http://localhost:8111";

const CustomerApi = {
    //Get 회원정보 token 으로 가죠오기
  getCustomerInfo: async (token) => {
    return await axios.get(DOMAIN + "/customer/profile",{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  //put 사용자 상테 메시지 수정
  updateStatMsg: async (token, data) => {
    try {
      return await axios.put(DOMAIN + "/customer/updatestatmsg", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },

  //put 사용자 이미지 수정
  updateProfilePic: async (token, data) => {
    try {
      return await axios.put(DOMAIN + "/customer/updateprofilepic", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },

  updateStatMsgProfilePic: async (token, data) => {
    try {
      return await axios.put(DOMAIN + "/customer/updateprofile", data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  },
  notification: async (email) => {
    const notisession = {
      "email": email
    }
    return await axios.post(DOMAIN + "/ws/notification", notisession);
  }
};

export default CustomerApi;