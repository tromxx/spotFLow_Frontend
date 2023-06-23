/* 유저 정보를 핸들링하는 api */
import axios from "axios";

const DOMAIN = "http://localhost:8111"

const CustomerApi = {
  getCustomer: async (email) => {
    return await axios.get(DOMAIN + "/user/" + email);
  },
  addCustomer: async (props) => {
    const data = {
      email : props.email,
      name : props.name,
      password : props.password,
      nickname : props.nickname,
      joinDate : props.joinDate,
    }
    return await axios.post(DOMAIN + "/user/" + props.email, data);
  },

};

export default CustomerApi;