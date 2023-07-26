import axios from "axios";

const Backend = "http://localhost:8111";



const NotificationApi = {

    getAllNoti: async (token) => {
			
			return await axios.post(Backend + "/notification/getall", {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
		},
    updateFetchNoti: async (token, nofiData) => {
      return await axios.put(Backend + "/notification/updatestatus", nofiData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    }
}

export default NotificationApi;




