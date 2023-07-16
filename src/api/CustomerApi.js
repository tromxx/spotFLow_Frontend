import axios from "axios";

const DOMAIN = "http://localhost:8111";

const CustomerApi = {
    //post 회원정보 token 으로 가죠오기
    getCustomerInfo: async (token) => {
        try {
          return await axios.post(DOMAIN + "/customer/profile",{},{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        } catch (error) {
          throw error;
        }
      }
      
};

export default CustomerApi;